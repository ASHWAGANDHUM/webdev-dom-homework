export const nameEl = document.getElementById('input-name');
export const buttonEl = document.getElementById('button-add');
export const listEl = document.getElementById('list');
export const textEl = document.getElementById('input-text');
export const formEl = document.querySelector('.add-form');

export const createAddCommentPlaceholder = () => {
    const el = document.createElement("div");
    el.textContent = "Добавление комментария...";
    el.className = "comment-placeholder hidden";
    return el;
};