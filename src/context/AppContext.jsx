import { createContext, useContext, useReducer } from 'react'
import clientsData from '../data/clients'
import sessionsData from '../data/sessions'
import checkInsData from '../data/checkIns'
import invoicesData from '../data/invoices'
import rostersData from '../data/rosters'

const AppContext = createContext()

const initialState = {
  clients: clientsData,
  sessions: sessionsData,
  checkIns: checkInsData,
  invoices: invoicesData,
  rosters: rostersData,
  selectedClientId: null,
  role: 'Admin',
  programName: 'CoachOS',
  defaultRate: 120,
}

function appReducer(state, action) {
  switch (action.type) {
    case 'MARK_CHECKIN_REVIEWED':
      return {
        ...state,
        checkIns: state.checkIns.map(ci =>
          ci.id === action.payload.id
            ? { ...ci, coachResponse: action.payload.response, status: 'Reviewed' }
            : ci
        ),
      }

    case 'ADD_SESSION':
      return {
        ...state,
        sessions: [...state.sessions, action.payload],
      }

    case 'GENERATE_INVOICE':
      return {
        ...state,
        invoices: [...state.invoices, action.payload],
      }

    case 'MARK_INVOICE_PAID':
      return {
        ...state,
        invoices: state.invoices.map(inv =>
          inv.id === action.payload.id
            ? { ...inv, status: 'Paid', paidDate: new Date().toISOString().split('T')[0] }
            : inv
        ),
      }

    case 'ADD_CLIENT_TO_ROSTER':
      return {
        ...state,
        rosters: state.rosters.map(r =>
          r.id === action.payload.rosterId
            ? { ...r, clientIds: [...r.clientIds, action.payload.clientId] }
            : r
        ),
      }

    case 'SET_SELECTED_CLIENT':
      return {
        ...state,
        selectedClientId: action.payload,
      }

    case 'SET_ROLE':
      return {
        ...state,
        role: action.payload,
      }

    case 'SET_PROGRAM_NAME':
      return {
        ...state,
        programName: action.payload,
      }

    case 'SET_DEFAULT_RATE':
      return {
        ...state,
        defaultRate: action.payload,
      }

    default:
      return state
  }
}

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, initialState)

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  return useContext(AppContext)
}
