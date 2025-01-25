# Abstract Factory Design Pattern

The **Abstract Factory Design Pattern** is a creational design pattern that provides an interface for creating families of related or dependent objects without specifying their concrete classes. It is particularly useful when you need to ensure that the created objects are compatible with each other.

## Real-World Example: UI Kit for Multiple Themes

Imagine you're building a **UI Kit** that supports multiple themes (e.g., Light Theme and Dark Theme). Each theme has its own set of components, such as buttons, text fields, and dialogs. The Abstract Factory pattern can be used to create families of related UI components without specifying their concrete classes.

### Key Concepts

1. **Abstract Factory**: Defines an interface for creating families of related objects.
2. **Concrete Factory**: Implements the abstract factory interface to create concrete products.
3. **Abstract Product**: Defines an interface for a type of product (e.g., `Button`, `TextField`).
4. **Concrete Product**: Implements the abstract product interface for a specific theme or platform.

### Example: UI Kit with Light and Dark Themes

#### Code Implementation

```typescript
/**
 * Abstract Product: Button
 * Defines the interface for buttons.
 */
interface Button {
	render(): void;
}

/**
 * Abstract Product: TextField
 * Defines the interface for text fields.
 */
interface TextField {
	render(): void;
}

/**
 * Concrete Product: LightButton
 * Implements the Button interface for the Light Theme.
 */
class LightButton implements Button {
	render() {
		console.log('Rendering a button in Light Theme');
	}
}

/**
 * Concrete Product: DarkButton
 * Implements the Button interface for the Dark Theme.
 */
class DarkButton implements Button {
	render() {
		console.log('Rendering a button in Dark Theme');
	}
}

/**
 * Concrete Product: LightTextField
 * Implements the TextField interface for the Light Theme.
 */
class LightTextField implements TextField {
	render() {
		console.log('Rendering a text field in Light Theme');
	}
}

/**
 * Concrete Product: DarkTextField
 * Implements the TextField interface for the Dark Theme.
 */
class DarkTextField implements TextField {
	render() {
		console.log('Rendering a text field in Dark Theme');
	}
}

/**
 * Abstract Factory: UIFactory
 * Defines an interface for creating families of related UI components.
 */
interface UIFactory {
	createButton(): Button;
	createTextField(): TextField;
}

/**
 * Concrete Factory: LightThemeFactory
 * Implements the UIFactory interface for the Light Theme.
 */
class LightThemeFactory implements UIFactory {
	createButton(): Button {
		return new LightButton();
	}

	createTextField(): TextField {
		return new LightTextField();
	}
}

/**
 * Concrete Factory: DarkThemeFactory
 * Implements the UIFactory interface for the Dark Theme.
 */
class DarkThemeFactory implements UIFactory {
	createButton(): Button {
		return new DarkButton();
	}

	createTextField(): TextField {
		return new DarkTextField();
	}
}

/**
 * Client Code
 * Uses the abstract factory to create UI components without knowing their concrete classes.
 * @param factory - The factory to use for creating UI components.
 */
function renderUI(factory: UIFactory) {
	const button = factory.createButton();
	const textField = factory.createTextField();

	button.render();
	textField.render();
}

// Use the Light Theme
const lightFactory = new LightThemeFactory();
renderUI(lightFactory);

// Use the Dark Theme
const darkFactory = new DarkThemeFactory();
renderUI(darkFactory);
```

---

### Output

When you run the client code, it will output:

```
Rendering a button in Light Theme
Rendering a text field in Light Theme
Rendering a button in Dark Theme
Rendering a text field in Dark Theme
```

---

### Why Use Abstract Factory?

1. **Consistency**: Ensures that the created objects are compatible with each other (e.g., all components use the same theme).
2. **Decoupling**: Decouples the client code from the concrete implementations of the components.
3. **Extensibility**: Makes it easy to add new themes or platforms without modifying existing code.

---

### JSDoc Comments

The code includes **JSDoc comments** to provide clear documentation for each class, interface, and method. This makes it easier for developers to understand the purpose and usage of each component.

---

### How to Run the Example

1. Install TypeScript:

    ```bash
    npm install -g typescript
    ```

2. Save the code in a file (e.g., `ui-kit.ts`).

3. Compile the TypeScript file:

    ```bash
    tsc ui-kit.ts
    ```

4. Run the compiled JavaScript file:
    ```bash
    node ui-kit.js
    ```
