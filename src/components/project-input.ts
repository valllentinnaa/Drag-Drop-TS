import {Component} from "./base-component";
import {Validatable, validate} from "../util/validation";
import {autobind} from "../decorators/autobind";
import {projectState} from "../state/project-state";


// ProjectInput Class
    export class ProjectInput extends Component<HTMLDivElement, HTMLFormElement> {
        titleInputElement: HTMLInputElement;
        descriptionInputElement: HTMLInputElement;
        peopleInputElement: HTMLInputElement;

        constructor() {
            super('project-input', 'app', true, 'user-input');
            this.titleInputElement = this.element.querySelector('#title') as HTMLInputElement;
            this.descriptionInputElement = this.element.querySelector('#description') as HTMLInputElement;
            this.peopleInputElement = this.element.querySelector('#people') as HTMLInputElement;
            this.configure();
        }

        private gatherUserInfo(): [string, string, number] | void {
            const enteredTitle = this.titleInputElement.value;
            const enteredDescripton = this.descriptionInputElement.value;
            const enteredPeople = this.peopleInputElement.value;

            const titleValidatable: Validatable = {
                value: enteredTitle,
                required: true
            }

            const descriptionValidatable: Validatable = {
                value: enteredDescripton,
                required: true,
                minLength: 5
            }
            const peopleValidatable: Validatable = {
                value: enteredPeople,
                required: true,
                min: 1,
                max: 5
            }

            if (!validate(titleValidatable) &&
                !validate(descriptionValidatable) &&
                !validate(peopleValidatable)
            ) {
                alert('Invalid input');
                return;
            } else {
                return [enteredTitle, enteredDescripton, +enteredPeople]
            }
        }

        configure() {
            this.element.addEventListener('submit', this.submitHandler)
        }

        renderContent() {
        }

        private clearInput() {
            this.titleInputElement.value = '';
            this.descriptionInputElement.value = '';
            this.peopleInputElement.value = '';
        }


        @autobind
        private submitHandler(event: Event) {
            event.preventDefault();
            const userInput = this.gatherUserInfo();
            if (Array.isArray(userInput)) {
                const [title, desc, people] = userInput;
                projectState.addProject(title, desc, people);
                this.clearInput();
            }
        }

    }