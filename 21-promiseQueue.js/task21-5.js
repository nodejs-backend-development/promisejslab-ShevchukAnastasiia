// ==================== ЗАВДАННЯ 21.5 ====================

/**
 * Створіть чергу з автоматичним retry
 * Якщо завдання падає - спробуйте ще раз
 */
class RetryQueue {
    constructor(maxRetries = 3) {
        this.queue = [];
        this.maxRetries = maxRetries;
        this.processing = false;
    }

    add(promiseFactory, retries = 0) {
        // Зберігаємо саму функцію і кількість вже зроблених спроб
        this.queue.push({ promiseFactory, retries });
        
        // Якщо черга зараз не працює, запускаємо її
        if (!this.processing) {
            this.process();
        }
    }

    async process() {
        this.processing = true;

        // Працюємо, поки в черзі є завдання
        while (this.queue.length > 0) {
            // Беремо перше завдання з черги
            const taskObj = this.queue.shift();
            const { promiseFactory, retries } = taskObj;

            try {
                // Спробуємо виконати завдання
                await promiseFactory();
                console.log('  [Успіх]: Завдання виконано!');
            } catch (error) {
                // Якщо впало, перевіряємо ліміт спроб
                if (retries < this.maxRetries) {
                    console.log(`  [Помилка]: Спроба ${retries + 1} невдала. Пробуємо знову...`);
                    // Повертаємо завдання на ПОЧАТОК черги з оновленим лічильником спроб
                    this.queue.unshift({ 
                        promiseFactory, 
                        retries: retries + 1 
                    });
                } else {
                    console.log(`  [Провал]: Завдання скасовано після ${this.maxRetries} невдалих спроб.`);
                }
            }
        }

        this.processing = false;
    }
}

// Перевірка:
console.log('Тест 21.5: Черга з retry');
const queue5 = new RetryQueue(3);

let attempt = 0;

queue5.add(() => {
    attempt++;
    console.log(`  Attempt ${attempt}`);
    
    // Симулюємо падіння на перших двох спробах
    if (attempt < 3) {
        return Promise.reject(new Error('Failed'));
    }
    // На третій раз все добре
    return Promise.resolve('Success!');
});