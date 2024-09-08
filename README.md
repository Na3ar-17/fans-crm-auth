 <h1>Клонуйте проєкт з GitHub репозиторію</h1>
    <pre>
        <code>git clone https://github.com/Na3ar-17/fans-crm-auth.git</code>
    </pre>

    <h2>Налаштування бази даних</h2>
    <p>Перед тим, як запустити проєкт, необхідно налаштувати базу даних MySQL та конфігураційні змінні для сервера:</p>
    <ol>
        <li>Створіть базу даних MySQL з назвою <strong>fanscrm</strong>.</li>
        <li>Налаштуйте змінні середовища для сервера:</li>
    </ol>
    <p>Перейдіть до директорії <code>server</code> і створіть файл <code>.env</code> з наступним вмістом:</p>
    <pre>
        <code>
cat <<EOT >> ./server/.env
DB_PASSWORD=YOU_DB_PASSWORD
JWT_SECRET=JWT_SECRET_KEY
EOT
        </code>
    </pre>
    <p>Замініть <code>YOU_DB_PASSWORD</code> на ваш фактичний пароль до бази даних MySQL, а <code>JWT_SECRET_KEY</code> — на бажаний секретний ключ для JWT.</p>

    <h2>Запуск проєкту</h2>
    <p>Щоб запустити сервер і клієнт, виконайте наступні команди:</p>

    <h3>Запуск сервера:</h3>
    <pre>
        <code>
cd ./server
yarn start:dev
        </code>
    </pre>

    <h3>Запуск клієнта:</h3>
    <pre>
        <code>
cd ./client
yarn start
        </code>
    </pre>

    <h2>API ендпоінти</h2>
    <p>Нижче наведені доступні серверні API ендпоінти:</p>
    <ul>
        <li><strong>POST</strong> /api/auth/register – Реєстрація нового користувача.</li>
        <li><strong>POST</strong> /api/auth/login – Авторизація користувача та отримання JWT токена.</li>
        <li><strong>GET</strong> /api/user/profile – Отримання інформації про профіль авторизованого користувача.</li>
    </ul>
