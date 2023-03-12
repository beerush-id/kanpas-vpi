import { reactive } from '@beerush/reactor';

export type ToastMessage = {
  title?: string;
  subtitle?: string;
  icon?: string;
  duration?: number;
  color?: 'primary' | 'accent' | 'warn';
  keepOpen?: boolean;
}

export type ToastQuestion<T> = {
  message: ToastMessage;
  resolve: (data?: T) => void;
  reject: () => void;
}

export class Toast {
  public messages = reactive<Array<ToastMessage>>([], false);
  public questions = reactive<ToastQuestion<unknown>[]>([], false);

  public info(message: ToastMessage): void {
    if (!message.icon) {
      message.icon = 'info';
    }

    message.color = 'primary';
    this.open(message);
  }

  public warn(message: ToastMessage): void {
    if (!message.icon) {
      message.icon = 'warning';
    }

    message.color = 'accent';
    this.open(message);
  }

  public error(message: ToastMessage): void {
    if (!message.icon) {
      message.icon = 'warning';
    }

    message.color = 'warn';
    message.keepOpen = true;
    this.open(message);
  }

  public open(message: ToastMessage): void {
    this.messages.push(message);

    if (!message.keepOpen) {
      setTimeout(() => {
        this.close(message);
      }, message.duration || 3000);
    }
  }

  public close(message: ToastMessage): void {
    this.messages.splice(this.messages.indexOf(message), 1);
  }

  public ask<T>(message: ToastMessage): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      this.questions.push({ message, resolve, reject } as never);
    });
  }

  public confirm<T>(question: ToastQuestion<T>, data?: T) {
    question.resolve(data);
    this.questions.splice(this.questions.indexOf(question as never), 1);
  }

  public decline<T>(question: ToastQuestion<T>) {
    question.reject();
    this.questions.splice(this.questions.indexOf(question as never), 1);
  }
}

export const toast: Toast = new Toast();
