// ==================== ЗАВДАННЯ 21.6 ====================

/**
 * Створіть чергу з callback'ами для моніторингу
 */
class MonitoredQueue {
    constructor(options = {}) {
        this.queue = [];
        this.processing = false;
        
        // Зберігаємо callback-функції з options або ставимо "заглушки" за замовчуванням
        this.onStart = options.onStart || (() => {});
        this.onComplete = options.onComplete || (() => {});
        this.onError = options.onError || (() => {});
        
        this.stats = {
            total: 0,
            completed: 0,
            failed: 0
        };
    }

    add(promiseFactory) {
        // Зберігаємо поточний індекс завдання (починається з 0)
        const index = this.stats.total;
        
        // Додаємо в чергу об'єкт, який містить саму функцію і її індекс
        this.queue.push({ promiseFactory, index });
        
        this.stats.total++; // Збільшуємо загальний лічильник

        // Якщо черга зараз "спить", запускаємо її
        if (!this.processing) {
            this.process();
        }
    }

    async process() {
        this.processing = true;

        while (this.queue.length > 0) {
            // Дістаємо наступне завдання та його індекс з початку черги
            const { promiseFactory, index } = this.queue.shift();

            // 1. Сигналізуємо про початок завдання
            this.onStart(index);

            try {
                // Намагаємося виконати проміс
                const result = await promiseFactory();
                
                // 2. Якщо успішно: збільшуємо лічильник і викликаємо callback успіху
                this.stats.completed++;
                this.onComplete(index, result);
            } catch (error) {
                // 3. Якщо помилка: збільшуємо лічильник помилок і викликаємо callback помилки
                this.stats.failed++;
                this.onError(index, error);
            }
        }

        this.processing = false;
    }

    getStats() {
        return this.stats;
    }
}

// Перевірка:
console.log('Тест 21.6: Черга з моніторингом');

const queue6 = new MonitoredQueue({
    onStart: (index) => console.log(`  Starting task ${index + 1}`),
    onComplete: (index, result) => console.log(`  Task ${index + 1} completed with result: ${result}`),
    onError: (index, error) => console.log(`  Task ${index + 1} failed:`, error.message)
});

// Додаємо завдання:
queue6.add(() => Promise.resolve('OK'));                 // Виконається успішно
queue6.add(() => Promise.reject(new Error('Fail')));     // Впаде з помилкою
queue6.add(() => Promise.resolve('OK'));                 // Виконається успішно

// Можемо перевірити фінальну статистику через невелику затримку, 
// щоб дати черзі час на обробку мікротасок
setTimeout(() => {
    console.log('  Фінальна статистика:', queue6.getStats());
    // Очікується: { total: 3, completed: 2, failed: 1 }
}, 100);