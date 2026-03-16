// ==================== ЗАВДАННЯ 21.4 ⭐ ====================

/**
 * Створіть чергу з обмеженням часу виконання
 * Якщо завдання не виконується за заданий час - скасуйте його
 */
class TimedQueue {
    constructor(timeout = 5000) {
        this.queue = [];
        this.timeout = timeout;
        this.processing = false;
    }

    add(promiseFactory) {
        // Додаємо нове завдання в чергу
        this.queue.push(promiseFactory);
        
        // Якщо черга зараз "спить" (не обробляється), запускаємо її
        if (!this.processing) {
            this.process();
        }
    }

    async process() {
        // Ставимо прапорець, що черга зайнята
        this.processing = true;

        // Виконуємо, поки в черзі є завдання
        while (this.queue.length > 0) {
            // Беремо перше завдання з початку черги
            const task = this.queue.shift();

            // Створюємо проміс-таймер, який завжди падає з помилкою через заданий час
            const timer = new Promise((_, reject) => {
                setTimeout(() => reject(new Error('Task timeout exceeded')), this.timeout);
            });

            try {
                // Влаштовуємо "гонку": або завдання виконається, або спрацює таймер
                await Promise.race([task(), timer]);
            } catch (error) {
                // Перехоплюємо помилку таймауту (або помилку самого завдання), щоб черга не впала
                console.log(`  [Скинуто]: ${error.message}`);
            }
        }

        // Коли черга порожня, знімаємо прапорець
        this.processing = false;
    }
}

// Перевірка:
console.log(' Тест 21.4: Черга з таймаутом');
const queue4 = new TimedQueue(500);

queue4.add(() => new Promise(resolve => {
    setTimeout(() => {
        console.log('  Fast task completed');
        resolve();
    }, 200); // Встигне (200ms < 500ms)
}));

queue4.add(() => new Promise(resolve => {
    setTimeout(() => {
        console.log('  This should not print (але є нюанс...)'); 
        resolve();
    }, 1000); // Не встигне (1000ms > 500ms)
}));