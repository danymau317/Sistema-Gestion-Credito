import { listTab, enableForm } from "./utils.js";
import { handleSubmitForm, handleTableActions, renderAll } from "./credit.js";

document.addEventListener('DOMContentLoaded', () => {
    renderAll();
    listTab();
    handleTableActions();
    enableForm();
    handleSubmitForm();
});