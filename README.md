# Drag and Drop
Wrapper React component for drag and drop behaviour using `react-dragula`

## Usage Example
State should be managed at the consumer, so an `onDrop` method is required.
Each direct child of the `DragAndDrop` component will be draggable, while the dragging holder (from which you can drag the whole element) needs to be marked with a class `drag-drop-target`.

```jsx
<DragAndDrop onDrop={this.changeOrder}>
    {list.map((item, i) => (
        <div className="drag-drop-target" key={i}>{item}</div>
    ))}
</DragAndDrop>
```

## Peer-Dependencies
- react
- reactDOM

## Instalation
Vian npm:
```
npm install @fiverr-private/drag_n_drop_package
```

Via yarn:
```
yarn add @fiverr-private/drag_n_drop_package
```
