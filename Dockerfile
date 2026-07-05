# Build stage
FROM maven:3.9.5-eclipse-temurin-21 AS build
WORKDIR /app
# Copia il pom.xml e scarica le dipendenze per velocizzare build future
COPY pom.xml .
RUN mvn dependency:go-offline

# Copia il codice sorgente e pacchettizza l'app ignorando i test in fase di build
COPY src ./src
RUN mvn clean package -DskipTests

# Run stage
FROM eclipse-temurin:21-jre-alpine
WORKDIR /app
# Copia il file jar generato dalla fase precedente
COPY --from=build /app/target/*.jar app.jar

# Esponi la porta usata da Spring Boot
EXPOSE 8080

# Avvia l'applicazione
ENTRYPOINT ["java", "-jar", "app.jar"]
