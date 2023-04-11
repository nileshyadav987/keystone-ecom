import _extends from '@babel/runtime/helpers/esm/extends';
import { jsx } from '@keystone-ui/core';
import { useRef, useEffect, useCallback, useMemo, useContext, createContext } from 'react';
import { useSensors, useSensor, MouseSensor, TouchSensor, KeyboardSensor, DndContext, closestCenter } from '@dnd-kit/core';
import { sortableKeyboardCoordinates, arrayMove, SortableContext, verticalListSortingStrategy, useSortable } from '@dnd-kit/sortable';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import { Button } from '@keystone-ui/button';
import { Trash2Icon } from '@keystone-ui/icons/icons/Trash2Icon';

const RemoveContext = /*#__PURE__*/createContext(null);
function OrderableList(props) {
  const sensors = useSensors(useSensor(MouseSensor, {
    activationConstraint: {
      distance: 3
    }
  }), useSensor(TouchSensor), useSensor(KeyboardSensor, {
    coordinateGetter: sortableKeyboardCoordinates
  }));
  const elementsRef = useRef(props.elements);
  useEffect(() => {
    elementsRef.current = props.elements;
  });
  const {
    onChange
  } = props;
  const onRemove = useCallback(index => {
    onChange(elementsRef.current.filter((_, i) => i !== index).map(x => ({
      key: x.key
    })));
  }, [onChange]);
  return jsx(RemoveContext.Provider, {
    value: onRemove
  }, jsx(DndContext, {
    sensors: sensors,
    collisionDetection: closestCenter,
    modifiers: [restrictToVerticalAxis],
    onDragEnd: _ref => {
      let {
        over,
        active
      } = _ref;
      if (over && over.id !== active.id) {
        const activeIndex = props.elements.findIndex(x => x.key === active.id);
        const overIndex = props.elements.findIndex(x => x.key === over.id);
        const newValue = arrayMove(props.elements.map(x => ({
          key: x.key
        })), activeIndex, overIndex);
        props.onChange(newValue);
      }
    }
  }, jsx(SortableContext, {
    items: useMemo(() => props.elements.map(x => x.key), [props.elements]),
    strategy: verticalListSortingStrategy
  }, jsx("ul", {
    css: {
      isolation: 'isolate',
      display: 'flex',
      gap: 8,
      flexDirection: 'column',
      padding: 0,
      margin: 0
    }
  }, props.children))));
}
const DragHandleListenersContext = /*#__PURE__*/createContext(null);
function OrderableItem(props) {
  var _transform$x, _transform$y;
  const {
    attributes,
    isDragging,
    listeners,
    setNodeRef,
    transform,
    transition,
    index
  } = useSortable({
    id: props.elementKey
  });
  const style = {
    transition,
    zIndex: isDragging ? 2 : 1,
    '--translate-x': `${Math.round((_transform$x = transform === null || transform === void 0 ? void 0 : transform.x) !== null && _transform$x !== void 0 ? _transform$x : 0)}px`,
    '--translate-y': `${Math.round((_transform$y = transform === null || transform === void 0 ? void 0 : transform.y) !== null && _transform$y !== void 0 ? _transform$y : 0)}px`,
    cursor: isDragging ? 'grabbing' : undefined
  };
  return jsx(DragHandleListenersContext.Provider, {
    value: useMemo(() => {
      return {
        attributes,
        listeners,
        isDragging,
        index
      };
    }, [attributes, listeners, isDragging, index])
  }, jsx("li", {
    ref: setNodeRef,
    css: {
      transform: `translateX(var(--translate-x, 0)) translateY(var(--translate-y, 0))`,
      listStyle: 'none'
    },
    style: style
  }, jsx("div", {
    style: {
      pointerEvents: isDragging ? 'none' : undefined,
      transform: `scale(${isDragging ? '1.02' : '1'})`,
      border: '1px solid #DFDFE7'
    },
    css: {
      backgroundColor: 'white',
      borderRadius: 8,
      padding: '8px',
      transition: 'transform 100ms ease, box-shadow 150ms ease'
    }
  }, props.children)));
}
function RemoveButton() {
  const sortable = useContext(DragHandleListenersContext);
  const onRemove = useContext(RemoveContext);
  if (sortable === null || onRemove === null) {
    throw new Error('Must use OrderableItem above RemoveButton');
  }
  return jsx(Button, {
    weight: "none",
    css: {
      padding: 7
    },
    onClick: () => onRemove(sortable.index),
    "aria-label": "Remove"
  }, jsx(Trash2Icon, {
    size: "small"
  }));
}
function DragHandle() {
  const sortable = useContext(DragHandleListenersContext);
  if (sortable === null) {
    throw new Error('Must use OrderableItem above DragHandle');
  }
  return jsx(Button, _extends({}, sortable.attributes, sortable.listeners, {
    css: {
      cursor: sortable.isDragging ? 'grabbing' : undefined,
      padding: 7
    },
    weight: "none",
    size: "small",
    "aria-label": "Drag handle"
  }), dragIcon);
}
const dragIcon = jsx("span", {
  css: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
}, jsx("svg", {
  width: "20",
  height: "21",
  xmlns: "http://www.w3.org/2000/svg"
}, jsx("path", {
  d: "M6 4h3v3H6V4Zm5 0h3v3h-3V4ZM9 9H6v3h3V9Zm2 0h3v3h-3V9Zm-2 5H6v3h3v-3Zm2 0h3v3h-3v-3Z",
  fill: "currentColor"
})));

export { DragHandle as D, OrderableList as O, RemoveButton as R, OrderableItem as a };