import { listTab, enableForm } from "./utils.js";
import { handleSubmitForm, handleTableActions, renderAll } from "./credit.js";
import { fetchCredits } from "./state.js";

document.addEventListener('DOMContentLoaded', () => {
    renderAll();
    fetchCredits();
    listTab();
    handleTableActions();
    enableForm();
    handleSubmitForm();
});