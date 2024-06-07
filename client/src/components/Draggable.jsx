import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";

function Draggable({ icon, id }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: id,
  });
  const style = { transform: CSS.Transform.toString(transform) };
  return (
    <div className="mt-4 gap-6">
      <img
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
        className="relative w-[32px] cursor-pointer z-40"
        src={icon.img}
        key={id}
        alt="loading"
      />
    </div>
  );
}

export default Draggable;
