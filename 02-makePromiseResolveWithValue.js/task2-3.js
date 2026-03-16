// ==================== ЗАВДАННЯ 2.3 ====================

/**
 * Створіть функцію, яка конвертує об'єкт користувача
 * додаючи йому поле fullName
 * * @param {{firstName: string, lastName: string}} user 
 * @returns {Promise<{firstName: string, lastName: string, fullName: string}>}
 */
function addFullName(user) {
    // 1. Додаємо нове поле fullName до існуючого об'єкта
    // Використовуємо шаблонні рядки (зворотні лапки) для зручного зліплення
    user.fullName = `${user.firstName} ${user.lastName}`;
    
    // 2. Повертаємо оновлений об'єкт як успішно виконаний проміс
    return Promise.resolve(user);
}

// Перевірка:
addFullName({ firstName: 'Anastasiia', lastName: 'Shevchuk' })
    .then(user => console.log(' Тест 2.3:', user));
// Очікується: { firstName: 'Anastasiia', lastName: 'Shevchuk', fullName: 'Anastasiia Shevchuk' }