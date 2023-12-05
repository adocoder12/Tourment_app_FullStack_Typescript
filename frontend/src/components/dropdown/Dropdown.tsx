import { useState } from "react";
import style from "./dropdown.module.css";

interface DropdownList {
  id: string;
  name: string;
}

interface Props {
  setDropdownID: (category: string) => void;
  title: string;
  dropdownList: DropdownList[] | undefined;
}

export default function Dropdown({
  setDropdownID,
  title,
  dropdownList,
}: Props) {
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  console.log(dropdownList);

  const handleSelectChange = (id: string) => {
    console.log(id);
    setSelectedItem(id);
    setDropdownID(id);
  };

  console.log("dropwdown" + dropdownList);

  return (
    <details className={style.customSelect}>
      <summary className={style.radios}>
        <input
          type="radio"
          name={`item_default_${title}`}
          id="default"
          title={title}
          className={style.inputItem}
          checked={selectedItem === null}
          onChange={() => setSelectedItem(null)}
        />
        {dropdownList?.map((item, key) => (
          <input
            key={key}
            type="radio"
            name={`item_${title}`}
            id={`${item.id}_${title}`}
            className={style.inputItem}
            title={item.name}
            value={item.id}
            checked={selectedItem === item.id}
            onChange={() => handleSelectChange(item.id)}
          />
        ))}
      </summary>
      <ul className={style.list}>
        {dropdownList?.map((item, key) => (
          <li key={key} className={style.itemList}>
            <label htmlFor={`${item.id}_${title}`} className={style.label}>
              {item.name}
              <span className={style.span}></span>
            </label>
          </li>
        ))}
      </ul>
    </details>
  );
}
