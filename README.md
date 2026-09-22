# Parcial II - Aseguramiento de Calidad de Software

Prototipo desarrollado para el **Examen Parcial II** del curso de **Aseguramiento de Calidad de Software** de la Universidad Mariano Gálvez de Guatemala.

El proyecto presenta la aplicación práctica de técnicas y herramientas de calidad de software dentro de un escenario **FinTech**, con énfasis en la evaluación de transacciones, análisis de riesgos, automatización de pruebas, configuración de linters y desarrollo mediante **TDD (Test-Driven Development)**.

---

## Información académica

**Universidad:** Universidad Mariano Gálvez de Guatemala  
**Carrera:** Ingeniería en Sistemas de la Información y Ciencias de la Computación  
**Curso:** Aseguramiento de Calidad de Software  
**Evaluación:** Examen Parcial II  
**Estudiante:** Marverick Joel Argueta Cifuentes  
**Carné:** 0904-22-9069  

---

## Descripción del proyecto

El proyecto implementa un prototipo simplificado para la evaluación de transacciones dentro de un entorno FinTech.

El sistema analiza diferentes características de una transacción con el objetivo de determinar su nivel de riesgo y establecer si requiere una revisión adicional.

Entre los parámetros considerados se encuentran:

- Monto de la transacción.
- Tipo de cliente.
- Ubicación de la dirección IP.
- Reglas asociadas con la evaluación del riesgo.

Además del prototipo funcional, el proyecto incorpora diferentes prácticas de aseguramiento de calidad.

---

## Objetivos

### Objetivo general

Aplicar técnicas de aseguramiento de calidad de software sobre un prototipo FinTech, integrando estrategias de diseño de pruebas, priorización de riesgos, automatización, análisis estático y desarrollo guiado por pruebas.

### Objetivos específicos

- Aplicar **Pairwise Testing** para reducir la cantidad de combinaciones necesarias.
- Identificar y priorizar riesgos mediante una **matriz 5x5**.
- Diseñar una **pirámide de automatización de pruebas**.
- Implementar análisis estático utilizando **ESLint**.
- Aplicar el ciclo **Red - Green - Refactor** de TDD.
- Implementar pruebas automatizadas para validar la lógica del prototipo.

---

# Estrategia de calidad

El proyecto utiliza cinco componentes principales:

1. Pairwise Testing.
2. Matriz de priorización de riesgos 5x5.
3. Pirámide de automatización.
4. Configuración de Linters.
5. Test-Driven Development (TDD).

---

## 1. Pairwise Testing

El **Pairwise Testing** permite disminuir la cantidad de combinaciones que deben probarse sin perder completamente la interacción entre los parámetros principales.

Para el módulo de transacciones se definieron las siguientes variables:

| Variable | Valores |
|---|---|
| Monto | Alto / Bajo |
| Tipo de cliente | Nuevo / Frecuente |
| Ubicación IP | Nacional / Internacional |

Una combinación exhaustiva produciría **8 escenarios diferentes**.

Mediante Pairwise Testing se utilizan los siguientes cuatro casos:

| Caso | Monto | Cliente | IP |
|---|---|---|---|
| 1 | Alto | Nuevo | Nacional |
| 2 | Alto | Frecuente | Internacional |
| 3 | Bajo | Nuevo | Internacional |
| 4 | Bajo | Frecuente | Nacional |

De esta manera se reduce la cantidad de escenarios manteniendo cobertura sobre las interacciones por pares.

---

## 2. Matriz de priorización de riesgos

Los riesgos del prototipo fueron analizados utilizando una matriz **5x5**, considerando:

- Probabilidad.
- Impacto.

El nivel de exposición se determina mediante:

```text
Riesgo = Probabilidad × Impacto
```

Los principales riesgos considerados son:

| ID | Riesgo | P | I | Valor |
|---|---|---:|---:|---:|
| R1 | La IA bloquea una transacción legítima | 4 | 3 | 12 |
| R2 | Brecha de seguridad en la API | 2 | 5 | 10 |
| R3 | Caída del proveedor de IA | 3 | 4 | 12 |
| R4 | Tiempo de respuesta superior a 3 segundos | 4 | 2 | 8 |

La matriz permite orientar las pruebas y controles hacia los escenarios que representan una mayor exposición para el sistema.

---

## 3. Pirámide de automatización

La estrategia propuesta distribuye las pruebas de la siguiente manera:

```text
                    /\
                /        \
               / Manuales \
              /   < 5 %    \
             /--------------\
            /    E2E / UI    \
           /       15 %       \
          /--------------------\
         /     Integración      \
        /         30 %           \
       /--------------------------\
      / Unitarias / Componentes   \
     /           50 %+             \
    /_______________________________\
```

### Pruebas unitarias

Representan la mayor parte de la automatización.

Permiten validar de forma rápida las reglas individuales utilizadas para evaluar una transacción.

### Pruebas de integración

Comprueban la comunicación entre diferentes componentes del sistema.

### Pruebas E2E

Validan recorridos completos del usuario y la interacción entre los principales componentes.

### Pruebas manuales

Se reservan principalmente para pruebas exploratorias, experiencia de usuario y situaciones donde el criterio humano aporta mayor valor.

---

# ESLint

El proyecto utiliza **ESLint** para realizar análisis estático sobre el código fuente.

El objetivo es detectar problemas antes de ejecutar o integrar cambios al proyecto.

Entre las reglas utilizadas se encuentran:

```text
@typescript-eslint/no-explicit-any
@typescript-eslint/explicit-function-return-type
no-console
```

Estas reglas permiten controlar aspectos como:

- Uso innecesario del tipo `any`.
- Definición explícita de tipos de retorno.
- Uso de `console`.
- Consistencia del código.
- Mantenibilidad.

---

## Ejecutar ESLint

Para ejecutar el análisis:

```bash
pnpm lint
```

ESLint analizará los archivos del proyecto y mostrará los problemas encontrados.

Ejemplo:

```text
error  Unexpected any. Specify a different type
error  Missing return type on function
error  Unexpected console statement
```

La finalidad es corregir estos problemas antes de considerar el código preparado para integración.

---

# Test-Driven Development

El proyecto utiliza el enfoque **TDD (Test-Driven Development)**.

El proceso se divide en tres etapas:

```text
RED
 ↓
GREEN
 ↓
REFACTOR
 ↺
```

---

## Red

Primero se escribe una prueba que define el comportamiento esperado.

Por ejemplo:

```typescript
describe('evaluateTransaction', () => {

  it('debería marcar la transacción para revisión si el monto es mayor a 10000', () => {

    const result = evaluateTransaction(10500);

    expect(result.requiresReview).toBe(true);

  });

});
```

Inicialmente la prueba debe fallar porque la funcionalidad todavía no ha sido implementada correctamente.

Ejemplo:

```text
Test Suites: 1 failed, 1 total
Tests:       3 failed, 1 passed, 4 total
```

---

## Green

Después se implementa únicamente el código necesario para satisfacer el comportamiento definido.

Las pruebas se ejecutan nuevamente.

Resultado esperado:

```text
PASS src/transaction.spec.ts

Test Suites: 1 passed, 1 total
Tests:       4 passed, 4 total
```

Esto demuestra que los comportamientos definidos por las pruebas se encuentran implementados.

---

## Refactor

Cuando todas las pruebas están aprobadas se puede mejorar la estructura interna del código.

Entre las posibles mejoras se encuentran:

- Mejorar nombres de variables.
- Mejorar nombres de funciones.
- Eliminar código duplicado.
- Separar responsabilidades.
- Mejorar el tipado.
- Cumplir las reglas establecidas por ESLint.

Después de cada refactorización se ejecutan nuevamente las pruebas.

Si continúan aprobándose, significa que la estructura interna fue modificada sin alterar el comportamiento esperado.

---

# Tecnologías utilizadas

- TypeScript
- Node.js
- pnpm
- Jest
- ESLint
- Git
- GitHub

---

# Instalación

Clonar el repositorio:

```bash
git clone https://github.com/marve77/parcial-2-calidad-de-software.git
```

Ingresar al proyecto:

```bash
cd parcial-2-calidad-de-software
```

Instalar las dependencias:

```bash
pnpm install
```

---

# Ejecución de pruebas

Ejecutar:

```bash
pnpm test
```

El resultado esperado después de completar la implementación es:

```text
Test Suites: 1 passed, 1 total
Tests:       4 passed, 4 total
```

---

# Ejecución del Linter

Ejecutar:

```bash
pnpm lint
```

Este comando analiza el código utilizando las reglas configuradas en ESLint.

---

# Flujo de trabajo utilizado

El proceso general aplicado al proyecto puede resumirse como:

```text
Identificación de riesgos
          ↓
Pairwise Testing
          ↓
Diseño de casos de prueba
          ↓
Prueba TDD - RED
          ↓
Implementación - GREEN
          ↓
REFACTOR
          ↓
ESLint
          ↓
Validación final
```

---

# Resultados

La implementación permitió:

- Reducir escenarios mediante Pairwise Testing.
- Identificar riesgos relevantes mediante una matriz 5x5.
- Definir una estrategia de automatización.
- Incorporar análisis estático mediante ESLint.
- Aplicar el ciclo Red-Green-Refactor.
- Automatizar la validación del comportamiento.
- Obtener una suite de pruebas satisfactoria.

---

# Repositorio

Código fuente disponible en:

**GitHub:**  
https://github.com/marve77/parcial-2-calidad-de-software

---

## Conclusión

La aplicación conjunta de Pairwise Testing, priorización de riesgos, automatización, ESLint y TDD permite incorporar el aseguramiento de calidad directamente al proceso de desarrollo.

En lugar de depender únicamente de pruebas realizadas al finalizar el proyecto, las técnicas utilizadas permiten detectar problemas desde etapas tempranas, reducir escenarios redundantes y mantener una validación automática sobre las reglas implementadas.

El ciclo **Red - Green - Refactor** proporciona además una metodología controlada para incorporar funcionalidades y posteriormente mejorar el código sin perder el comportamiento previamente validado.

---

## Licencia

Proyecto desarrollado con fines académicos para el curso de **Aseguramiento de Calidad de Software**.

Universidad Mariano Gálvez de Guatemala.
