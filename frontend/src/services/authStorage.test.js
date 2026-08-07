import test from "node:test";
import assert from "node:assert/strict";
import {
  clearStoredAuthState,
  getStoredAuthState,
  persistAuthState,
} from "./authStorage.js";

class MockStorage {
  constructor() {
    this.store = new Map();
  }

  getItem(key) {
    return this.store.has(key) ? this.store.get(key) : null;
  }

  setItem(key, value) {
    this.store.set(key, String(value));
  }

  removeItem(key) {
    this.store.delete(key);
  }

  clear() {
    this.store.clear();
  }
}

test("persistAuthState stores the auth session data for later use", () => {
  globalThis.localStorage = new MockStorage();

  persistAuthState({
    accessToken: "access-token",
    refreshToken: "refresh-token",
    user: { id: "user-1", name: "Admin", role: "ADMIN" },
  });

  const state = getStoredAuthState();

  assert.equal(state.accessToken, "access-token");
  assert.equal(state.refreshToken, "refresh-token");
  assert.equal(state.user.name, "Admin");
  assert.equal(state.isAuthenticated, true);
});

test("clearStoredAuthState removes the saved authentication state", () => {
  globalThis.localStorage = new MockStorage();

  persistAuthState({
    accessToken: "access-token",
    refreshToken: "refresh-token",
    user: { id: "user-1", name: "Admin", role: "ADMIN" },
  });

  clearStoredAuthState();

  assert.deepEqual(getStoredAuthState(), {
    accessToken: null,
    refreshToken: null,
    user: null,
    isAuthenticated: false,
  });
});
