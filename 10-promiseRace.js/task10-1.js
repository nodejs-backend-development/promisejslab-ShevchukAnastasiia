// ==================== ЗАВДАННЯ 10.1 ====================

/**
 * Створіть функцію, яка повертає найшвидшу відповідь
 * * @param {number[]} delays - Масив затримок в мілісекундах
 * @returns {Promise<number>} - Найменша затримка
 */
function getFastestResponse(delays) {
    // 1. Перетворюємо масив чисел на масив промісів
    const promises = delays.map(delay => {
        return new Promise(resolve => {
            // Кожен проміс успішно виконується (резолвиться) 
            // зі значенням своєї затримки після того, як ця затримка мине
            setTimeout(() => {
                resolve(delay);
            }, delay);
        });
    });

    // 2. Використовуємо Promise.race(), щоб отримати перший виконаний проміс
    return Promise.race(promises);
}

// Перевірка:
getFastestResponse([1000, 500, 2000, 300])
    .then(result => console.log('Тест 10.1:', result)); // Виведе: Тест 10.1: 300