import { handleSubmitForm, listTab } from "./credit.js";
import { handleTableActions } from "./credit.js";
import { enableForm } from "./credit.js";

document.addEventListener('DOMContentLoaded', () => {
    listTab();
    handleTableActions();
    enableForm();
    handleSubmitForm();
});