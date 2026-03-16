//==================== БОНУСНЕ ЗАВДАННЯ 7.6 🔥 ====================

/**
 * Створіть функцію, яка виконує серію трансформацій над рядком
 * і повертає історію всіх змін
 * * @param {string} text 
 * @returns {Promise<{original: string, steps: string[], final: string}>}
 */
function transformWithHistory(text) {
    // Створюємо масив для збереження історії кроків
    const steps = [];

    return Promise.resolve(text)
        // 2. Конвертує в нижній регістр
        .then(str => {
            const lowerCaseStr = str.toLowerCase();
            steps.push(lowerCaseStr); // Зберігаємо в історію
            return lowerCaseStr;      // Передаємо далі
        })
        // 3. Видаляє пробіли
        .then(str => {
            const noSpacesStr = str.split(' ').join(''); // або str.replace(/\s+/g, '')
            steps.push(noSpacesStr); // Зберігаємо в історію
            return noSpacesStr;      // Передаємо далі
        })
        // 4. Інвертує рядок
        .then(str => {
            const reversedStr = str.split('').reverse().join('');
            steps.push(reversedStr); // Зберігаємо в історію
            return reversedStr;      // Передаємо далі
        })
        // 5. Повертає об'єкт з original, steps[], final
        .then(finalStr => {
            return {
                original: text, // text доступний через замикання з параметрів функції
                steps: steps,
                final: finalStr
            };
        });
}

// Перевірка:
transformWithHistory('Hello World')
    .then(result => console.log('Тест 7.6:', result));

// Очікується: {
//   original: 'Hello World',
//   steps: ['hello world', 'helloworld', 'dlrowolleh'],
//   final: 'dlrowolleh'
// 