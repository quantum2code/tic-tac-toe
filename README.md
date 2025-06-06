# Tic-Tac-Toe

a project to practice managing state and logic in React

maybe would add  websocket for multiplayer

# Learnings
## Notes from ChatGPT
Thinking in React’s “state-driven” way takes some practice. Here are some tips to help you develop this mindset:

---

### 1. **State is Asynchronous**
- When you call `setState` (like `setMatrix`), React schedules an update, but the value doesn’t change immediately.
- Any logic that depends on the **new** state should go in a `useEffect` that listens for that state.

---

### 2. **React to State Changes**
- Instead of running logic right after a state change, **react** to the change using `useEffect`.
- Example:  
  ```jsx
  useEffect(() => {
    // This runs every time 'matrix' changes
    // so you always have the latest board
    const result = gameLogic(matrix, "x");
    // ...
  }, [matrix]);
  ```

---

### 3. **Think in Data Flow**
- User clicks → update state → React re-renders → `useEffect` runs with new state.
- Don’t try to “do everything at once” in your event handlers.

---

### 4. **Mental Model**
- Imagine your UI as a function of state:  
  `UI = f(state)`
- When state changes, React re-runs your component and effects.

---

### 5. **Summary Table**

| What you want to do         | Where to put it                |
|-----------------------------|-------------------------------|
| Update state                | In event handlers             |
| React to state changes      | In `useEffect` with deps      |
| Render UI                   | In the return statement       |

---

**Practice:**  
Whenever you want to do something with the latest state, ask:  
> “Should this happen right after a state change, or after React has updated the state?”

If it’s the latter, use `useEffect`.

        
                ~ChatGPT