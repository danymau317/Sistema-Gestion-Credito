import { listTab, enableForm, showCreditStadistics } from "./utils.js";
import { handleSubmitForm, handleTableActions, renderAll } from "./credit.js";
import { fetchCredits } from "./state.js";
import { renderStadistics } from "./stats.js";

document.addEventListener('DOMContentLoaded', () => {
    renderAll();
    fetchCredits();
    showCreditStadistics();
    renderStadistics();
    listTab();
    handleTableActions();
    enableForm();
    handleSubmitForm();
});