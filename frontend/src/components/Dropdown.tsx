import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaChevronDown } from "react-icons/fa";

interface DropdownItem {
  label: string;
  to: string;
}

interface DropdownProps {
  label: string;
  items: DropdownItem[];
}

const Dropdown = ({ label, items }: DropdownProps) => {
  const [open, setOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  // In component zetten "refractoring"
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center gap-2 hover:text-yellow-500 transition font-ttnorms font-bold"
      >
        {label}
        <FaChevronDown
          className={`text-xs transition ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div className="absolute left-0 mt-2 w-44 bg-white border rounded-lg shadow-lg z-50 font-ttnorms font-bold">
          {items.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="block px-4 py-2 hover:bg-gray-100"
              onClick={() => setOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
