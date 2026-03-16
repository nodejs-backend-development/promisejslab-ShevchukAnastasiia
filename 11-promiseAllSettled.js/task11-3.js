// ==================== ЗАВДАННЯ 11.3 ====================

/**
 * Завантажити дані з кількох API
 * Використати успішні результати, логувати помилки
 */
function fetchAPI(url) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (url.includes('broken')) {
                reject(new Error(`API ${url} is down`));
            } else {
                resolve({ url, data: `Data from ${url}` });
            }
        }, Math.random() * 300);
    });
}

/**
 * @param {string[]} urls 
 * @returns {Promise<{successful: object[], failed: Error[]}>}
 */
async function fetchMultipleAPIs(urls) {
    // 1. Створюємо масив промісів
    const promises = urls.map(url => fetchAPI(url));

    // 2. Чекаємо на завершення ВСІХ запитів
    const results = await Promise.allSettled(promises);

    // 3. Відбираємо лише успішні результати та дістаємо їхні значення (value)
    const successful = results
        .filter(result => result.status === 'fulfilled')
        .map(result => result.value);

    // 4. Відбираємо лише помилки та дістаємо причини відмови (reason)
    const failed = results
        .filter(result => result.status === 'rejected')
        .map(result => result.reason);

    // 5. Повертаємо згрупований об'єкт
    return {
        successful: successful,
        failed: failed
    };
}

// Перевірка:
const apis = [
    'https://api1.com/data',
    'https://api2-broken.com/data',
    'https://api3.com/data',
    'https://api4-broken.com/data',
    'https://api5.com/data'
];

fetchMultipleAPIs(apis)
    .then(result => {
        console.log('Тест 11.3:');
        console.log('  Successful:', result.successful.length); // Очікується: 3
        console.log('  Failed:', result.failed.length);         // Очікується: 2
        
        // Можемо також вивести деталі, щоб переконатися, що дані правильні:
        // console.log('  Дані успішних:', result.successful);
        // console.log('  Помилки:', result.failed.map(e => e.message));
    });