//==================== ЗАВДАННЯ 7.1 ====================

/**
 * Створіть ланцюжок, який:
 * 1. Починається з числа 5
 * 2. Множить на 2
 * 3. Додає 10
 * 4. Конвертує в рядок
 * * Очікуваний результат: "20"
 */

function simpleChain() {
    return Promise.resolve(5)
        // Множимо на 2
        .then(value => value * 2)
        // Додаємо 10
        .then(value => value + 10)
        // Конвертуємо в рядок
        .then(value => String(value)); // або value.toString()
}

// Перевірка:
simpleChain()
    .then(result => console.log('Тест 7.1:', result)); // Виведе: Тест 7.1: 20