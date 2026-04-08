/**
 * ЗАВДАННЯ 2: Promise.resolve() та статичні методи
 * * Promise.resolve() - швидкий спосіб створити успішний проміс
 */

// ==================== ЗАВДАННЯ 2.1 ====================

/**
 * Створіть проміс, який одразу резолвиться зі значенням
 * * @param {any} value - Будь-яке значення
 * @returns {Promise<any>}
 */
function makePromiseResolveWith(value) {
    return Promise.resolve(value);
}

// Перевірка:
makePromiseResolveWith(7)
    .then(value => console.log(' Тест 2.1:', value));