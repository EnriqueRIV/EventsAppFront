import './selectfilter.css';

export const selectFilter = () => {
  const selectContainer = document.querySelector('.selectOrder');
  const selector = document.createElement('select');
  selector.id = 'order_by';
  selector.title = 'Order by';
  selector.name = 'order_by';
  selector.className = 'orderby';
  selector.classList.add('infoBtn');
  selector.placeholder = 'Order By';
  const selectOptionDefault = document.createElement('option');
  selectOptionDefault.textContent = 'Order By .....';
  selectOptionDefault.value = '';
  selectOptionDefault.selected = true;
  const selectOptionOne = document.createElement('option');
  selectOptionOne.className = 'optionOne';
  selectOptionOne.value = 'Next Date';
  selectOptionOne.textContent = 'Next Date';
  const selectOptionTwo = document.createElement('option');
  selectOptionTwo.className = 'optionTwo';
  selectOptionTwo.value = 'A - Z';
  selectOptionTwo.textContent = 'A - Z';
  const selectOptionThree = document.createElement('option');
  selectOptionThree.className = 'optionThree';
  selectOptionThree.value = 'A - Z username';
  selectOptionThree.textContent = 'Username A - Z';

  selectContainer.appendChild(selector);
  selector.appendChild(selectOptionDefault);
  selector.appendChild(selectOptionOne);
  selector.appendChild(selectOptionTwo);
  selector.appendChild(selectOptionThree);
};
