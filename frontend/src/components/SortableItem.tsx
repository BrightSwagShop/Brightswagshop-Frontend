import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { FiFolder, FiMenu } from "react-icons/fi";
type SortableItemProps = {
  id: string;
  label: string;
  count: number;
};
const SortableItem = ({ id, label, count }: SortableItemProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="flex items-center justify-between py-3 border-b bg-white"
    >
      {/* LEFT */}
      <div className="flex items-center gap-3">
        <FiFolder className="text-xl text-gray-500" />
        <span>{label}</span>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-3">
        <span className="bg-gray-200 px-2 py-1 rounded text-sm">
          {count}
        </span>

        {/* DRAG HANDLE */}
        <FiMenu
          {...attributes}
          {...listeners}
          className="cursor-grab text-gray-500"
        />
      </div>
    </div>
  );
};

export default SortableItem;