import md5 from 'md5';

const uuid = () => md5(String(Math.random()));

const defaultWidgetType = {
  title: 'Untitled Widget',
  render: () => null,
  defaultSize: 'lg',
  supportsSizes: ['sm', 'lg'],
};

const defaultWidget = {
  id: null,
  size: 'lg',
  type: '',
  settings: {},
};

/**
 * Types stores registered widget type objects
 */
export const types = (state = {}, action) => {
  switch (action.type) {
    case 'REGISTER_WIDGET': {
      return {
        ...state,
        [action.handle]: { ...defaultWidgetType, ...action.config },
      };
    }
    default:
      return state;
  }
};

/**
 * Layouts are stored arrays of widget instances.
 */
export const layouts = (state = {}, action) => {
  switch (action.type) {
    case 'SET_WIDGETS': {
      return {
        ...state,
        [action.layout]: Array.isArray(action.widgets) ? [...action.widgets] : [],
      };
    }

    case 'INSERT_WIDGET': {
      const current = Array.isArray(state[action.layout]) ? state[action.layout] : [];
      return {
        ...state,
        [action.layout]: [
          {
            ...defaultWidget,
            id: uuid(),
            type: action.config.type,
            size:
              Object.prototype.hasOwnProperty.call(action.config, 'size')
                ? action.config.size
                : defaultWidget.size,
            settings:
              Object.prototype.hasOwnProperty.call(action.config, 'settings')
                ? action.config.settings
                : defaultWidget.settings,
          },
          ...current,
        ],
      };
    }

    case 'DELETE_WIDGET': {
      const current = Array.isArray(state[action.layout]) ? state[action.layout] : [];
      const index = current.findIndex((item) => item.id === action.id);
      if (index === -1) return state;

      const next = [...current];
      next.splice(index, 1);
      return {
        ...state,
        [action.layout]: next,
      };
    }

    case 'RESET_WIDGETS': {
      return {
        ...state,
        [action.layout]: Array.isArray(state.default) ? [...state.default] : [],
      };
    }

    default:
      return state;
  }
};
