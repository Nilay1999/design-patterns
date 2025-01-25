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
