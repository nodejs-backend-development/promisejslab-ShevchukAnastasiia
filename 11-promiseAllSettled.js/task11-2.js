// ==================== ЗАВДАННЯ 11.2 ====================

/**
 * Відправити email всім користувачам
 * Повернути статистику: скільки відправлено, скільки помилок
 */
function sendEmail(email) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // 30% шанс помилки
            if (Math.random() > 0.7) {
                reject(new Error(`Failed to send to ${email}`));
            } else {
                resolve(`Email sent to ${email}`);
            }
        }, 100);
    });
}

/**
 * @param {string[]} emails 
 * @returns {Promise<{sent: number, failed: number, details: object[]}>}
 */
async function sendBulkEmails(emails) {
    // 1. Створюємо масив промісів (запускаємо відправку для кожного email)
    const emailPromises = emails.map(email => sendEmail(email));

    // 2. Використовуємо await, щоб дочекатися завершення ВСІХ промісів
    const results = await Promise.allSettled(emailPromises);

    // 3. Рахуємо статистику за допомогою фільтрації за статусом
    const sentCount = results.filter(result => result.status === 'fulfilled').length;
    const failedCount = results.filter(result => result.status === 'rejected').length;

    // 4. Повертаємо об'єкт зі статистикою та деталями
    return {
        sent: sentCount,
        failed: failedCount,
        details: results
    };
}

// Перевірка:
const emails = ['user1@test.com', 'user2@test.com', 'user3@test.com', 'user4@test.com'];

sendBulkEmails(emails)
    .then(result => console.log('Тест 11.2:', result));

// Очікується (результати можуть відрізнятися через Math.random): 
// { 
//   sent: 3, 
//   failed: 1, 
//   details: [ 
//     { status: 'fulfilled', value: 'Email sent to user1@test.com' },
//     { status: 'rejected', reason: Error: Failed to send to user2@test.com },
//     ...
//   ] 
// }