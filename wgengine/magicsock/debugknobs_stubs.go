// Copyright (c) Tailscale Inc & AUTHORS
// SPDX-License-Identifier: BSD-3-Clause

//go:build ios || js

package magicsock

import "tailscale.com/types/opt"

// All knobs are disabled on iOS and Wasm.
//
// They're inlinable and the linker can deadcode that's guarded by them to make
// smaller binaries.
func debugDisco() bool              { return false }
func debugOmitLocalAddresses() bool { return false }
func logDerpVerbose() bool          { return false }
func debugReSTUNStopOnIdle() bool   { return false }
func debugAlwaysDERP() bool         { return false }
func debugEnableSilentDisco() bool  { return false }
func debugUseDerpRouteEnv() string  { return "" }
func debugUseDerpRoute() opt.Bool   { return "" }

func inTest() bool { return false }
