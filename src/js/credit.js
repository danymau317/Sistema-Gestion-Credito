export function listTab() {
    let listItems = document.querySelectorAll('.list__item');

    listItems.forEach((item) => {
        item.addEventListener('click', () => {
            listItems.forEach((el) => el.classList.remove('list__item--selected'));
            item.classList.add('list__item--selected');
        });
    });
}
