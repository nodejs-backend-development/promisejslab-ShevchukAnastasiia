// ==================== ЗАВДАННЯ 1.3 ====================

/**
 * Створіть проміс з валідацією email
 * Якщо email містить @ та . - resolve з email
 * Інакше - reject з повідомленням про помилку
 *
 * @param {string} email 
 * @returns {Promise<string, string>}
 */
function validateEmail(email) {
    // Повертаємо новий проміс
    return new Promise((resolve, reject) => {
        // Перевіряємо, чи рядок містить потрібні символи
        if (email.includes('@') && email.includes('.')) {
            resolve(email); // Якщо так — успіх, повертаємо сам email
        } else {
            reject('Невалідний email!'); // Якщо ні — відхиляємо з повідомленням
        }
    });
}

// Перевірка:
validateEmail('test@example.com')
    .then(email => console.log(' Тест 1.3 (валідний):', email))
    .catch(err => console.log('   Помилка:', err));

validateEmail('invalid-email')
    .then(email => console.log('   Не повинно виконатися'))
    .catch(err => console.log(' Тест 1.3 (невалідний):', err));