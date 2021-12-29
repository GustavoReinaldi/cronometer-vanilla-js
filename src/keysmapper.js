const MAPPED_KEYS = [
  {
    name: "Enter",
    keyCode: 13,
    elementId: "body",
    method: () => handleActionButtonClick(),
  },
  {
    name: "ESC",
    keyCode: 27,
    elementId: "body",
    method: () => clearCronometer(),
  },
  {
    name: "Space",
    keyCode: 32,
    elementId: "body",
    method: () => markTime(),
  },
  {
    name: "C",
    keyCode: 67,
    elementId: "body",
    method: () => clearMarkedTimes(),
  },
];

function keyExecEvent(event) {
  console.log(event.keyCode);
  MAPPED_KEYS.find(
    (item) =>
      (event.target.id == item.elementId ||
        event.target.localName == item.elementId) &&
      item.keyCode == event.keyCode &&
      item.method()
  );
}
