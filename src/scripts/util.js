export const $ = document.querySelector.bind(document);

export const createElement = (className, content, type = "div") => {
  const element = document.createElement(type);
  element.className = className;
  element.textContent = content;
  return element;
};

export const storage = {
  get: (name, json = false) => {
    const item = window.localStorage.getItem(name);
    if (item && json) {
      return JSON.parse(json);
    }

    return item;
  },

  set: (name, value, json = false) => {
    const item = json ? JSON.stringify(value) : value;
    window.localStorage.setItem(name, item);
    return value;
  }
};
