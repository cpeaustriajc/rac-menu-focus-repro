import { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { Button, Menu, MenuItem, MenuTrigger, Popover } from "react-aria-components";
import "./styles.css";

function Example({ name, animated, onAction }) {
  return (
    <div className="row">
      <MenuTrigger>
        <Button>{name}</Button>
        <Popover className={animated ? "popover animated" : "popover"}>
          <Menu aria-label={name} onAction={(key) => onAction(`${name}: ${key}`)}>
            <MenuItem id="A">A</MenuItem>
            <MenuItem id="B">B</MenuItem>
          </Menu>
        </Popover>
      </MenuTrigger>
      <button type="button">After {name}</button>
    </div>
  );
}

function describe(element) {
  if (!element || element === document.body) return "<body>";
  const role = element.getAttribute("role");
  return `${element.tagName.toLowerCase()}${role ? `[role=${role}]` : ""} "${element.textContent}"`;
}

function ActiveElement() {
  const [text, setText] = useState(() => describe(document.activeElement));
  useEffect(() => {
    let frame = requestAnimationFrame(function tick() {
      setText(describe(document.activeElement));
      frame = requestAnimationFrame(tick);
    });
    return () => cancelAnimationFrame(frame);
  }, []);
  return <output>document.activeElement: {text}</output>;
}

function App() {
  const [actions, setActions] = useState([]);
  const onAction = (action) => setActions((list) => [...list, action]);
  return (
    <>
      <section>
        <h2>1. Tab in an open menu (no animation)</h2>
        <Example name="Menu 1" onAction={onAction} />
      </section>
      <section>
        <h2>2 and 3. Menu with a 300 ms exit animation</h2>
        <Example name="Menu 2" animated onAction={onAction} />
      </section>
      <ActiveElement />
      <output>Actions: {actions.join(", ") || "none"}</output>
    </>
  );
}

createRoot(document.getElementById("root")).render(<App />);
