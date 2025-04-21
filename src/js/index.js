import { listTab, enableForm, showCreditStadistics } from "./utils.js";
import { handleSubmitForm, handleTableActions, renderAll } from "./credit.js";
import { fetchCredits } from "./state.js";

document.addEventListener('DOMContentLoaded', () => {
    renderAll();
    fetchCredits();
    showCreditStadistics();
    listTab();
    handleTableActions();
    enableForm();
    handleSubmitForm();
});