Оваа апликација овозможува додавање, уредување, бришење и прегледување на производи во инвентар систем. Системот е изработен со Angular (frontend) и Spring Boot (backend) + MySQL.

Чекори за стартување на апликацијата
За Backend

1.Отвори го проектот во IDE по избор

2.Во application.properties постави ја конфигурација за базата:
   ```properties
   spring.datasource.url=jdbc:mysql://localhost:3306/products_inventory
   spring.datasource.username=your_username
   spring.datasource.password=your_password
   spring.jpa.hibernate.ddl-auto=update
   spring.jpa.show-sql=true
```
3.Апликацијата се стартува преку ProductsInventoryApplication.java
Се уклучува на http://localhost:8080/api/products

4.За frontend да се стартува во терминал се влегува во frontend папката и се инсталираат потребни зависности
npm install и потоа се стартува со ng serve
Се уклучува на http://localhost:4200

5.Конфигурацијата на базата (MySQL)
Се прави база CREATE DATABASE products_inventory;
Табелите се генерираат автоматски