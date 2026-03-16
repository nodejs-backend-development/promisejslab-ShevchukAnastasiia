// ==================== ЗАВДАННЯ 10.3 ====================

/**
 * Симуляція запитів до різних серверів
 * Поверніть відповідь від найшвидшого сервера
 */
function fetchFromServer(serverName, delay) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve({
                server: serverName,
                data: `Data from ${serverName}`,
                responseTime: delay
            });
        }, delay);
    });
}

/**
 * Отримайте дані від найшвидшого сервера
 * * @returns {Promise<{server: string, data: string, responseTime: number}>}
 */
function fetchFromFastestServer() {
    // Створюємо масив запитів до трьох різних серверів
    const requestA = fetchFromServer('Server A', 1000);
    const requestB = fetchFromServer('Server B', 500);
    const requestC = fetchFromServer('Server C', 800);

    // Promise.race поверне результат того запиту, який виконається першим
    return Promise.race([requestA, requestB, requestC]);
}

// Перевірка:
fetchFromFastestServer()
    .then(result => console.log('Тест 10.3:', result));

// Очікується: { server: 'Server B', data: 'Data from Server B', responseTime: 500 }