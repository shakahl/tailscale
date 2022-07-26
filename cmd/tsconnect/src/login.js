// Copyright (c) 2022 Tailscale Inc & AUTHORS All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

import QRCode from "qrcode"

export async function showLoginURL(url) {
  if (loginNode) {
    loginNode.remove()
  }
  loginNode = document.createElement("div")
  loginNode.className = "flex flex-col items-center justify-items-center"
  const linkNode = document.createElement("a")
  linkNode.className = "text-blue-600 hover:underline"
  linkNode.href = url
  linkNode.target = "_blank"
  loginNode.appendChild(linkNode)

  try {
    const dataURL = await QRCode.toDataURL(url, { width: 512 })
    const imageNode = document.createElement("img")
    imageNode.className = "mx-auto"
    imageNode.src = dataURL
    imageNode.width = 256
    imageNode.height = 256
    linkNode.appendChild(imageNode)
  } catch (err) {
    console.error("Could not generate QR code:", err)
  }

  linkNode.appendChild(document.createTextNode(url))

  document.body.appendChild(loginNode)
}

export function hideLoginURL() {
  if (!loginNode) {
    return
  }
  loginNode.remove()
  loginNode = undefined
}

let loginNode

export function showLogoutButton(ipn) {
  if (logoutButtonNode) {
    logoutButtonNode.remove()
  }
  logoutButtonNode = document.createElement("button")
  logoutButtonNode.className = "font-bold"
  logoutButtonNode.textContent = "Logout"
  logoutButtonNode.addEventListener(
    "click",
    () => {
      ipn.logout()
    },
    { once: true }
  )
  document.getElementById("header").appendChild(logoutButtonNode)
}

export function hideLogoutButton() {
  if (!logoutButtonNode) {
    return
  }
  logoutButtonNode.remove()
  logoutButtonNode = undefined
}

let logoutButtonNode
