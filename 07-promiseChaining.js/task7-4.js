//==================== ЗАВДАННЯ 7.4 ====================

/**
 * Створіть ланцюжок з обробкою помилок
 * Якщо number < 0 - кинути помилку
 * Інакше виконати обчислення
 */
function validateNumber(number) {
    if (number < 0) {
        throw new Error('Number must be positive');
    }
    return number;
}

/**
 * Створіть функцію, яка:
 * 1. Валідує число (використовуйте validateNumber)
 * 2. Множить на 2
 * 3. Додає 5
 * 4. Повертає результат у форматі {original: number, result: number}
 * 5. Обробляє помилки та повертає {error: string}
 * * @param {number} number 
 * @returns {Promise<{original?: number, result?: number, error?: string}>}
 */
function safeCalculation(number) {
    return Promise.resolve(number)
        // 1. Валідуємо число
        .then(num => validateNumber(num))
        // 2. Множимо на 2
        .then(num => num * 2)
        // 3. Додаємо 5
        .then(num => num + 5)
        // 4. Повертаємо об'єкт із результатом
        // (використовуємо оригінальний параметр number)
        .then(result => ({ original: number, result: result }))
        // 5. Перехоплюємо помилку, якщо вона виникла на будь-якому кроці
        .catch(err => ({ error: err.message }));
}

// Перевірка:
safeCalculation(10)
    .then(result => console.log('Тест 7.4a:', result));
// Очікується: { original: 10, result: 25 }

safeCalculation(-5)
    .then(result => console.log('Тест 7.4b:', result));
// Очікується: { error: 'Number must be positive' }