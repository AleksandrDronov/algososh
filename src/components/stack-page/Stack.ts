interface IStack<T> {
    getElements: () => T[];
    push: (item: T) => void;
    pop: () => void;
    peak: () => T | null;
    getSize: () => number;
  }
  
  class Stack<T> implements IStack<T> {
    private container: T[] = [];
  
    push = (item: T): void => {
      this.container.push(item);
    };
  
    pop = (): void => {
      this.container.pop();
    };
  
    peak = (): T | null => {
      if (this.getSize()) {
        return this.container[this.getSize() - 1];
      }
      return null;
    };
  
    getSize = () => this.container.length;
  
    getElements = (): T[] => this.container;
  
    delElements = (): void => {
      this.container = [];
    };
  }
  
  export const stack = new Stack<string>();