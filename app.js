const STORAGE_KEY = "netwatch.devices.v1";
const LOG_KEY = "netwatch.logs.v1";
const CATEGORIES = ["Router", "Switch", "Access Point", "Laptop", "HP", "Server"];

const elements = {
  pageTitle: document.getElementById("pageTitle"),
  clock: document.getElementById("clock"),
  sidebar: document.getElementById("sidebar"),
  menuToggle: document.getElementById("menuToggle"),
  navLinks: document.querySelectorAll(".nav-link, [data-view]"),
  statTotal: document.getElementById("statTotal"),
  statTotalHint: document.getElementById("statTotalHint"),
  statOnline: document.getElementById("statOnline"),
  statOnlineHint: document.getElementById("statOnlineHint"),
  statOffline: document.getElementById("statOffline"),
  statOfflineHint: document.getElementById("statOfflineHint"),
  statAvgPing: document.getElementById("statAvgPing"),
  statPingHint: document.getElementById("statPingHint"),
  statusDonut: document.getElementById("statusDonut"),
  statusLegend: document.getElementById("statusLegend"),
  categoryBars: document.getElementById("categoryBars"),
  recentLogs: document.getElementById("recentLogs"),
  searchDevice: document.getElementById("searchDevice"),
  categoryFilter: document.getElementById("categoryFilter"),
  statusFilter: document.getElementById("statusFilter"),
  deviceRows: document.getElementById("deviceRows"),
  deviceCount: document.getElementById("deviceCount"),
  deviceEmpty: document.getElementById("deviceEmpty"),
  addDeviceBtn: document.getElementById("addDeviceBtn"),
  detailDevice: document.getElementById("detailDevice"),
  pingForm: document.getElementById("pingForm"),
  pingDeviceSelect: document.getElementById("pingDeviceSelect"),
  manualIp: document.getElementById("manualIp"),
  pingAttempts: document.getElementById("pingAttempts"),
  pingResult: document.getElementById("pingResult"),
  pingHistory: document.getElementById("pingHistory"),
  reportSummary: document.getElementById("reportSummary"),
  reportRows: document.getElementById("reportRows"),
  printReport: document.getElementById("printReport"),
  exportReport: document.getElementById("exportReport"),
  resetDemo: document.getElementById("resetDemo"),
  deviceDialog: document.getElementById("deviceDialog"),
  deviceForm: document.getElementById("deviceForm"),
  closeDeviceDialog: document.getElementById("closeDeviceDialog"),
  cancelDevice: document.getElementById("cancelDevice"),
  deviceDialogTitle: document.getElementById("deviceDialogTitle"),
  formError: document.getElementById("formError"),
  deviceId: document.getElementById("deviceId"),
  deviceName: document.getElementById("deviceName"),
  deviceCategory: document.getElementById("deviceCategory"),
  deviceIp: document.getElementById("deviceIp"),
  deviceMac: document.getElementById("deviceMac"),
  deviceLocation: document.getElementById("deviceLocation"),
  deviceStatus: document.getElementById("deviceStatus")
};

const titleMap = {
  dashboard: "Dashboard",
  devices: "Devices",
  detail: "Detail Device",
  ping: "Ping Test",
  report: "Report"
};

const state = {
  devices: [],
  logs: [],
  selectedDeviceId: "",
  lastPingResult: null,
  view: "dashboard"
};

function seedDevices() {
  const now = Date.now();
  return [
    {
      id: createId(),
      name: "Core Router",
      category: "Router",
      ip: "192.168.10.1",
      mac: "A8:4B:2C:10:01:AA",
      location: "Ruang Server",
      status: "online",
      latency: 12,
      packetLoss: 0,
      lastPing: new Date(now - 1000 * 60 * 8).toISOString(),
      lastSeen: new Date(now - 1000 * 60 * 8).toISOString(),
      owner: "Network"
    },
    {
      id: createId(),
      name: "Switch Lantai 2",
      category: "Switch",
      ip: "192.168.10.12",
      mac: "A8:4B:2C:10:02:BB",
      location: "Panel Lantai 2",
      status: "online",
      latency: 9,
      packetLoss: 0,
      lastPing: new Date(now - 1000 * 60 * 12).toISOString(),
      lastSeen: new Date(now - 1000 * 60 * 12).toISOString(),
      owner: "Network"
    },
    {
      id: createId(),
      name: "AP Lobby",
      category: "Access Point",
      ip: "192.168.10.21",
      mac: "BC:21:8F:45:22:1C",
      location: "Lobby",
      status: "online",
      latency: 24,
      packetLoss: 2,
      lastPing: new Date(now - 1000 * 60 * 20).toISOString(),
      lastSeen: new Date(now - 1000 * 60 * 20).toISOString(),
      owner: "Front Office"
    },
    {
      id: createId(),
      name: "Server Database",
      category: "Server",
      ip: "192.168.10.40",
      mac: "1C:7D:22:BA:92:19",
      location: "Rack A",
      status: "online",
      latency: 16,
      packetLoss: 0,
      lastPing: new Date(now - 1000 * 60 * 5).toISOString(),
      lastSeen: new Date(now - 1000 * 60 * 5).toISOString(),
      owner: "IT"
    },
    {
      id: createId(),
      name: "Laptop Admin",
      category: "Laptop",
      ip: "192.168.10.73",
      mac: "E4:5F:01:BC:19:44",
      location: "Meja Admin",
      status: "online",
      latency: 31,
      packetLoss: 4,
      lastPing: new Date(now - 1000 * 60 * 17).toISOString(),
      lastSeen: new Date(now - 1000 * 60 * 17).toISOString(),
      owner: "Admin"
    },
    {
      id: createId(),
      name: "HP Gudang",
      category: "HP",
      ip: "192.168.10.82",
      mac: "D0:A6:37:21:5B:91",
      location: "Gudang",
      status: "offline",
      latency: 0,
      packetLoss: 100,
      lastPing: new Date(now - 1000 * 60 * 48).toISOString(),
      lastSeen: new Date(now - 1000 * 60 * 70).toISOString(),
      owner: "Warehouse"
    },
    {
      id: createId(),
      name: "Server Backup",
      category: "Server",
      ip: "192.168.10.45",
      mac: "1C:7D:22:BA:92:20",
      location: "Rack B",
      status: "offline",
      latency: 0,
      packetLoss: 100,
      lastPing: new Date(now - 1000 * 60 * 64).toISOString(),
      lastSeen: new Date(now - 1000 * 60 * 120).toISOString(),
      owner: "IT"
    },
    {
      id: createId(),
      name: "AP Meeting",
      category: "Access Point",
      ip: "192.168.10.23",
      mac: "BC:21:8F:45:22:2D",
      location: "Ruang Meeting",
      status: "online",
      latency: 27,
      packetLoss: 1,
      lastPing: new Date(now - 1000 * 60 * 16).toISOString(),
      lastSeen: new Date(now - 1000 * 60 * 16).toISOString(),
      owner: "Office"
    }
  ];
}

function seedLogs(devices) {
  const now = Date.now();
  return devices.slice(0, 7).map((device, index) => {
    const success = device.status === "online";
    return {
      id: createId(),
      deviceId: device.id,
      deviceName: device.name,
      ip: device.ip,
      status: success ? "online" : "offline",
      category: device.category,
      average: success ? device.latency : 0,
      loss: success ? device.packetLoss : 100,
      attempts: 4,
      timestamp: new Date(now - index * 1000 * 60 * 11).toISOString(),
      samples: success
        ? [
            { seq: 1, ok: true, latency: Math.max(4, device.latency - 3) },
            { seq: 2, ok: true, latency: device.latency },
            { seq: 3, ok: true, latency: device.latency + 2 },
            { seq: 4, ok: device.packetLoss < 50, latency: device.latency + 1 }
          ]
        : [
            { seq: 1, ok: false, latency: 0 },
            { seq: 2, ok: false, latency: 0 },
            { seq: 3, ok: false, latency: 0 },
            { seq: 4, ok: false, latency: 0 }
          ]
    };
  });
}

function init() {
  loadData();
  fillCategoryOptions();
  bindEvents();
  updateClock();
  render();
  setInterval(updateClock, 1000 * 30);
}

function loadData() {
  const devices = readJson(STORAGE_KEY);
  const logs = readJson(LOG_KEY);
  if (Array.isArray(devices) && devices.length) {
    state.devices = devices;
    state.logs = Array.isArray(logs) ? logs : [];
  } else {
    state.devices = seedDevices();
    state.logs = seedLogs(state.devices);
    persist();
  }
  state.selectedDeviceId = state.devices[0]?.id || "";
}

function readJson(key) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function persist() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state.devices));
  localStorage.setItem(LOG_KEY, JSON.stringify(state.logs.slice(0, 150)));
}

function fillCategoryOptions() {
  const options = CATEGORIES.map((category) => `<option value="${category}">${category}</option>`).join("");
  elements.categoryFilter.innerHTML = `<option value="all">Semua kategori</option>${options}`;
  elements.deviceCategory.innerHTML = options;
}

function bindEvents() {
  elements.navLinks.forEach((button) => {
    button.addEventListener("click", () => setView(button.dataset.view));
  });

  elements.menuToggle.addEventListener("click", () => {
    document.body.classList.toggle("sidebar-open");
  });

  elements.searchDevice.addEventListener("input", renderDevices);
  elements.categoryFilter.addEventListener("change", renderDevices);
  elements.statusFilter.addEventListener("change", renderDevices);
  elements.addDeviceBtn.addEventListener("click", () => openDeviceDialog());
  elements.closeDeviceDialog.addEventListener("click", closeDeviceDialog);
  elements.cancelDevice.addEventListener("click", closeDeviceDialog);
  elements.deviceForm.addEventListener("submit", handleDeviceSubmit);
  elements.pingForm.addEventListener("submit", handlePingSubmit);
  elements.pingDeviceSelect.addEventListener("change", handlePingTargetChange);
  elements.printReport.addEventListener("click", () => window.print());
  elements.exportReport.addEventListener("click", exportCsv);
  elements.resetDemo.addEventListener("click", resetDemo);

  document.addEventListener("click", (event) => {
    const action = event.target.closest("[data-action]");
    if (!action) return;
    const { action: actionName, id } = action.dataset;
    if (actionName === "detail") openDetail(id);
    if (actionName === "edit") openDeviceDialog(id);
    if (actionName === "delete") deleteDevice(id);
    if (actionName === "ping") runPingForDevice(id);
    if (actionName === "toggle") toggleDeviceStatus(id);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") document.body.classList.remove("sidebar-open");
  });
}

function setView(view) {
  if (!view) return;
  state.view = view;
  document.querySelectorAll(".view").forEach((section) => {
    section.hidden = section.id !== `view-${view}`;
  });
  elements.navLinks.forEach((button) => {
    if (!button.classList.contains("nav-link")) return;
    const activeView = view === "detail" ? "devices" : view;
    button.classList.toggle("active", button.dataset.view === activeView);
  });
  elements.pageTitle.textContent = titleMap[view] || "Dashboard";
  document.body.classList.remove("sidebar-open");
  render();
}

function render() {
  renderDashboard();
  renderDevices();
  renderDetail();
  renderPing();
  renderReport();
}

function renderDashboard() {
  const stats = getStats();
  elements.statTotal.textContent = stats.total;
  elements.statTotalHint.textContent = `${stats.categoriesUsed} kategori`;
  elements.statOnline.textContent = stats.online;
  elements.statOnlineHint.textContent = `${stats.onlinePercent}% aktif`;
  elements.statOffline.textContent = stats.offline;
  elements.statOfflineHint.textContent = stats.offline ? "Butuh cek" : "Stabil";
  elements.statAvgPing.textContent = `${stats.avgPing} ms`;
  elements.statPingHint.textContent = stats.online ? "Perangkat online" : "Tidak ada online";

  elements.statusDonut.style.background = `conic-gradient(var(--green) 0 ${stats.onlinePercent}%, var(--red) ${stats.onlinePercent}% 100%)`;
  elements.statusLegend.innerHTML = `
    ${legendItem("Online", stats.online, "var(--green)")}
    ${legendItem("Offline", stats.offline, "var(--red)")}
  `;

  const maxCategory = Math.max(...CATEGORIES.map((category) => countByCategory(category).total), 1);
  elements.categoryBars.innerHTML = CATEGORIES.map((category, index) => {
    const data = countByCategory(category);
    const percent = Math.round((data.online / maxCategory) * 100);
    const color = ["var(--cyan)", "var(--green)", "var(--amber)", "var(--violet)", "var(--red)", "var(--cyan)"][index];
    return `
      <div class="bar-row">
        <span>${category}</span>
        <div class="bar-track"><div class="bar-fill" style="width:${percent}%; background:${color}"></div></div>
        <strong>${data.online}/${data.total}</strong>
      </div>
    `;
  }).join("");

  elements.recentLogs.innerHTML = state.logs.slice(0, 5).map(renderLogItem).join("") || `<div class="empty-state">Belum ada log.</div>`;
}

function renderDevices() {
  const devices = getFilteredDevices();
  elements.deviceCount.textContent = `${devices.length} device`;
  elements.deviceRows.innerHTML = devices.map((device) => `
    <tr>
      <td>
        <div class="device-name">
          ${deviceIconMarkup(device.category)}
          <span class="device-title">
            <strong>${escapeHtml(device.name)}</strong>
            <small>${escapeHtml(device.mac)}</small>
          </span>
        </div>
      </td>
      <td><span class="chip">${escapeHtml(device.category)}</span></td>
      <td>${escapeHtml(device.ip)}</td>
      <td>${escapeHtml(device.location)}</td>
      <td><span class="status-chip ${device.status}">${labelStatus(device.status)}</span></td>
      <td>${device.status === "online" ? `${device.latency} ms` : "-"}</td>
      <td>
        <div class="row-actions">
          <button class="ghost-button" type="button" data-action="detail" data-id="${device.id}">Detail</button>
          <button class="ghost-button" type="button" data-action="ping" data-id="${device.id}">Ping</button>
        </div>
      </td>
    </tr>
  `).join("");
  elements.deviceEmpty.hidden = devices.length > 0;
}

function renderDetail() {
  const device = getSelectedDevice();
  if (!device) {
    elements.detailDevice.innerHTML = `<section class="panel empty-state">Device belum dipilih.</section>`;
    return;
  }
  const logs = getDeviceLogs(device.id).slice(0, 6);
  elements.detailDevice.innerHTML = `
    <section class="panel detail-hero">
      <div class="detail-heading">
        <div>
          <p class="eyebrow">${escapeHtml(device.category)}</p>
          <h2>${escapeHtml(device.name)}</h2>
          <span class="status-chip ${device.status}">${labelStatus(device.status)}</span>
        </div>
        ${deviceIconMarkup(device.category)}
      </div>
      <div class="detail-grid">
        ${detailItem("IP Address", device.ip)}
        ${detailItem("MAC Address", device.mac)}
        ${detailItem("Lokasi", device.location)}
        ${detailItem("Owner", device.owner || "-")}
        ${detailItem("Ping terakhir", formatDateTime(device.lastPing))}
        ${detailItem("Packet loss", `${device.packetLoss || 0}%`)}
      </div>
      <div class="detail-actions">
        <button class="primary-button" type="button" data-action="ping" data-id="${device.id}">Jalankan Ping</button>
        <button class="ghost-button" type="button" data-action="toggle" data-id="${device.id}">${device.status === "online" ? "Set Offline" : "Set Online"}</button>
        <button class="ghost-button" type="button" data-action="edit" data-id="${device.id}">Edit</button>
        <button class="ghost-button" type="button" data-action="delete" data-id="${device.id}">Hapus</button>
      </div>
    </section>
    <section class="panel">
      <div class="panel-header">
        <div>
          <p class="eyebrow">Ping Log</p>
          <h2>Riwayat device</h2>
        </div>
      </div>
      <div class="compact-log">${logs.map(renderLogItem).join("") || `<div class="empty-state">Belum ada log.</div>`}</div>
    </section>
  `;
}

function renderPing() {
  const currentValue = elements.pingDeviceSelect.value;
  elements.pingDeviceSelect.innerHTML = `<option value="">IP manual</option>${state.devices
    .map((device) => `<option value="${device.id}">${escapeHtml(device.name)} - ${escapeHtml(device.ip)}</option>`)
    .join("")}`;
  elements.pingDeviceSelect.value = state.devices.some((device) => device.id === currentValue) ? currentValue : "";

  elements.pingResult.innerHTML = state.lastPingResult
    ? renderPingResult(state.lastPingResult)
    : "Belum ada ping dijalankan.";
  elements.pingResult.classList.toggle("empty-result", !state.lastPingResult);
  elements.pingHistory.innerHTML = state.logs.slice(0, 12).map(renderHistoryItem).join("") || `<div class="empty-state">Belum ada catatan ping.</div>`;
}

function renderReport() {
  const stats = getStats();
  const successLogs = state.logs.filter((log) => log.status === "online").length;
  const reliability = state.logs.length ? Math.round((successLogs / state.logs.length) * 100) : 0;
  const worst = [...state.devices].sort((a, b) => (b.packetLoss || 0) - (a.packetLoss || 0))[0];

  elements.reportSummary.innerHTML = `
    ${summaryItem("Total device", stats.total)}
    ${summaryItem("Online", `${stats.online} device`)}
    ${summaryItem("Offline", `${stats.offline} device`)}
    ${summaryItem("Reliabilitas log", `${reliability}%`)}
    ${summaryItem("Ping rata-rata", `${stats.avgPing} ms`)}
    ${summaryItem("Loss tertinggi", worst ? `${escapeHtml(worst.name)} (${worst.packetLoss || 0}%)` : "-")}
  `;

  elements.reportRows.innerHTML = state.devices.map((device) => `
    <tr>
      <td>
        <div class="device-name">
          ${deviceIconMarkup(device.category)}
          <span class="device-title"><strong>${escapeHtml(device.name)}</strong></span>
        </div>
      </td>
      <td>${escapeHtml(device.ip)}</td>
      <td><span class="status-chip ${device.status}">${labelStatus(device.status)}</span></td>
      <td>${device.packetLoss || 0}%</td>
      <td>${formatDateTime(device.lastPing)}</td>
    </tr>
  `).join("");
}

function getStats() {
  const total = state.devices.length;
  const online = state.devices.filter((device) => device.status === "online").length;
  const offline = total - online;
  const onlineDevices = state.devices.filter((device) => device.status === "online" && Number(device.latency));
  const avgPing = onlineDevices.length
    ? Math.round(onlineDevices.reduce((sum, device) => sum + Number(device.latency || 0), 0) / onlineDevices.length)
    : 0;
  const categoriesUsed = new Set(state.devices.map((device) => device.category)).size;
  return {
    total,
    online,
    offline,
    avgPing,
    categoriesUsed,
    onlinePercent: total ? Math.round((online / total) * 100) : 0
  };
}

function countByCategory(category) {
  const devices = state.devices.filter((device) => device.category === category);
  return {
    total: devices.length,
    online: devices.filter((device) => device.status === "online").length
  };
}

function getFilteredDevices() {
  const query = elements.searchDevice.value.trim().toLowerCase();
  const category = elements.categoryFilter.value;
  const status = elements.statusFilter.value;
  return state.devices.filter((device) => {
    const matchQuery = !query || [device.name, device.ip, device.location, device.mac].some((value) => value.toLowerCase().includes(query));
    const matchCategory = category === "all" || device.category === category;
    const matchStatus = status === "all" || device.status === status;
    return matchQuery && matchCategory && matchStatus;
  });
}

function handlePingTargetChange() {
  const device = state.devices.find((item) => item.id === elements.pingDeviceSelect.value);
  if (device) elements.manualIp.value = device.ip;
}

function handlePingSubmit(event) {
  event.preventDefault();
  const attempts = clamp(Number(elements.pingAttempts.value || 4), 1, 10);
  const selectedDevice = state.devices.find((device) => device.id === elements.pingDeviceSelect.value);
  const manualIp = elements.manualIp.value.trim();

  if (!selectedDevice && !isValidIp(manualIp)) {
    elements.pingResult.innerHTML = `<div class="form-error">IP manual tidak valid.</div>`;
    elements.pingResult.classList.remove("empty-result");
    return;
  }

  const target = selectedDevice || {
    id: "",
    name: "Manual IP",
    category: "Manual",
    ip: manualIp,
    status: Math.random() > 0.28 ? "online" : "offline",
    latency: 25,
    packetLoss: 0
  };

  const result = simulatePing(target, attempts);
  state.lastPingResult = result;
  state.logs.unshift(result);
  state.logs = state.logs.slice(0, 150);

  if (selectedDevice) updateDeviceAfterPing(selectedDevice.id, result);

  persist();
  render();
}

function runPingForDevice(id) {
  const device = state.devices.find((item) => item.id === id);
  if (!device) return;
  state.selectedDeviceId = id;
  elements.pingDeviceSelect.value = id;
  elements.manualIp.value = device.ip;
  const result = simulatePing(device, 4);
  state.lastPingResult = result;
  state.logs.unshift(result);
  state.logs = state.logs.slice(0, 150);
  updateDeviceAfterPing(id, result);
  persist();
  setView("ping");
}

function simulatePing(target, attempts) {
  const baseLatency = {
    Router: 11,
    Switch: 8,
    "Access Point": 22,
    Laptop: 33,
    HP: 42,
    Server: 16,
    Manual: 30
  }[target.category] || 28;
  const expectedOnline = target.status === "online";
  const samples = Array.from({ length: attempts }, (_, index) => {
    const ok = expectedOnline ? Math.random() > 0.08 : Math.random() > 0.9;
    const spike = Math.random() > 0.86 ? randomInt(18, 55) : 0;
    return {
      seq: index + 1,
      ok,
      latency: ok ? Math.max(4, baseLatency + randomInt(-5, 15) + spike) : 0
    };
  });
  const successSamples = samples.filter((sample) => sample.ok);
  const average = successSamples.length
    ? Math.round(successSamples.reduce((sum, sample) => sum + sample.latency, 0) / successSamples.length)
    : 0;
  const loss = Math.round(((attempts - successSamples.length) / attempts) * 100);
  const status = successSamples.length ? "online" : "offline";
  return {
    id: createId(),
    deviceId: target.id || "",
    deviceName: target.name || "Manual IP",
    ip: target.ip,
    category: target.category || "Manual",
    status,
    average,
    loss,
    attempts,
    timestamp: new Date().toISOString(),
    samples
  };
}

function updateDeviceAfterPing(id, result) {
  const device = state.devices.find((item) => item.id === id);
  if (!device) return;
  device.status = result.status;
  device.latency = result.average;
  device.packetLoss = result.loss;
  device.lastPing = result.timestamp;
  if (result.status === "online") device.lastSeen = result.timestamp;
}

function openDetail(id) {
  if (!state.devices.some((device) => device.id === id)) return;
  state.selectedDeviceId = id;
  setView("detail");
}

function getSelectedDevice() {
  return state.devices.find((device) => device.id === state.selectedDeviceId) || state.devices[0];
}

function getDeviceLogs(id) {
  return state.logs.filter((log) => log.deviceId === id);
}

function openDeviceDialog(id = "") {
  const device = state.devices.find((item) => item.id === id);
  elements.deviceDialogTitle.textContent = device ? "Edit Device" : "Tambah Device";
  elements.formError.textContent = "";
  elements.deviceId.value = device?.id || "";
  elements.deviceName.value = device?.name || "";
  elements.deviceCategory.value = device?.category || CATEGORIES[0];
  elements.deviceIp.value = device?.ip || "";
  elements.deviceMac.value = device?.mac || "";
  elements.deviceLocation.value = device?.location || "";
  elements.deviceStatus.value = device?.status || "online";

  if (typeof elements.deviceDialog.showModal === "function") {
    elements.deviceDialog.showModal();
  } else {
    elements.deviceDialog.setAttribute("open", "");
  }
  elements.deviceName.focus();
}

function closeDeviceDialog() {
  elements.deviceDialog.close();
}

function handleDeviceSubmit(event) {
  event.preventDefault();
  const id = elements.deviceId.value;
  const data = {
    name: elements.deviceName.value.trim(),
    category: elements.deviceCategory.value,
    ip: elements.deviceIp.value.trim(),
    mac: elements.deviceMac.value.trim().toUpperCase(),
    location: elements.deviceLocation.value.trim(),
    status: elements.deviceStatus.value
  };

  const duplicateIp = state.devices.some((device) => device.ip === data.ip && device.id !== id);
  if (!data.name || !data.location || !isValidIp(data.ip) || !isValidMac(data.mac) || duplicateIp) {
    elements.formError.textContent = duplicateIp
      ? "IP address sudah dipakai device lain."
      : "Lengkapi data dengan IP dan MAC yang valid.";
    return;
  }

  if (id) {
    const device = state.devices.find((item) => item.id === id);
    Object.assign(device, data);
  } else {
    state.devices.push({
      id: createId(),
      ...data,
      latency: data.status === "online" ? randomInt(12, 44) : 0,
      packetLoss: data.status === "online" ? randomInt(0, 8) : 100,
      lastPing: new Date().toISOString(),
      lastSeen: data.status === "online" ? new Date().toISOString() : "",
      owner: "General"
    });
  }

  persist();
  closeDeviceDialog();
  render();
}

function deleteDevice(id) {
  const device = state.devices.find((item) => item.id === id);
  if (!device) return;
  const confirmed = window.confirm(`Hapus ${device.name}?`);
  if (!confirmed) return;
  state.devices = state.devices.filter((item) => item.id !== id);
  state.logs = state.logs.filter((log) => log.deviceId !== id);
  state.selectedDeviceId = state.devices[0]?.id || "";
  persist();
  setView("devices");
}

function toggleDeviceStatus(id) {
  const device = state.devices.find((item) => item.id === id);
  if (!device) return;
  device.status = device.status === "online" ? "offline" : "online";
  device.packetLoss = device.status === "online" ? randomInt(0, 6) : 100;
  device.latency = device.status === "online" ? randomInt(10, 42) : 0;
  device.lastPing = new Date().toISOString();
  if (device.status === "online") device.lastSeen = device.lastPing;
  persist();
  render();
}

function resetDemo() {
  if (!window.confirm("Reset semua data demo?")) return;
  state.devices = seedDevices();
  state.logs = seedLogs(state.devices);
  state.selectedDeviceId = state.devices[0]?.id || "";
  state.lastPingResult = null;
  persist();
  render();
  setView("dashboard");
}

function exportCsv() {
  const header = ["Device", "IP", "MAC", "Kategori", "Lokasi", "Status", "Ping", "Packet Loss", "Last Ping"];
  const rows = state.devices.map((device) => [
    device.name,
    device.ip,
    device.mac,
    device.category,
    device.location,
    device.status,
    `${device.latency || 0} ms`,
    `${device.packetLoss || 0}%`,
    formatDateTime(device.lastPing)
  ]);
  const csv = [header, ...rows]
    .map((row) => row.map((value) => `"${String(value).replaceAll('"', '""')}"`).join(","))
    .join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = `laporan-monitoring-${new Date().toISOString().slice(0, 10)}.csv`;
  anchor.click();
  URL.revokeObjectURL(url);
}

function updateClock() {
  elements.clock.textContent = new Intl.DateTimeFormat("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
    day: "2-digit",
    month: "short"
  }).format(new Date());
}

function renderPingResult(result) {
  return `
    <div class="ping-result-grid">
      ${detailLine("Target", `${escapeHtml(result.deviceName)} (${escapeHtml(result.ip)})`)}
      ${detailLine("Status", labelStatus(result.status))}
      ${detailLine("Rata-rata", `${result.average} ms`)}
      ${detailLine("Packet loss", `${result.loss}%`)}
      ${detailLine("Percobaan", `${result.attempts} ping`)}
      ${detailLine("Waktu", formatDateTime(result.timestamp))}
    </div>
    <div class="sample-list">
      ${result.samples.map((sample) => `
        <div class="sample ${sample.ok ? "ok" : "fail"}">
          <span>icmp_seq=${sample.seq}</span>
          <strong>${sample.ok ? `${sample.latency} ms` : "timeout"}</strong>
        </div>
      `).join("")}
    </div>
  `;
}

function renderHistoryItem(log) {
  return `
    <div class="history-item">
      <div class="log-device">
        ${deviceIconMarkup(categoryForLog(log))}
        <div>
          <strong>${escapeHtml(log.deviceName)}</strong>
          <small>${escapeHtml(log.ip)} - ${formatDateTime(log.timestamp)}</small>
        </div>
      </div>
      <span class="status-chip ${log.status}">${log.status === "online" ? `${log.average} ms` : "Timeout"}</span>
    </div>
  `;
}

function renderLogItem(log) {
  return `
    <div class="log-item">
      <div class="log-device">
        ${deviceIconMarkup(categoryForLog(log))}
        <div>
          <strong>${escapeHtml(log.deviceName)}</strong>
          <small>${escapeHtml(log.ip)} - ${formatDateTime(log.timestamp)}</small>
        </div>
      </div>
      <span class="status-chip ${log.status}">${log.status === "online" ? `${log.average} ms` : "Timeout"}</span>
    </div>
  `;
}

function categoryForLog(log) {
  return log.category || state.devices.find((device) => device.id === log.deviceId)?.category || "Manual";
}

function deviceIconMarkup(category) {
  return `
    <span class="device-icon" style="--icon-color: ${categoryColor(category)}" aria-hidden="true">
      ${categoryIcon(category)}
    </span>
  `;
}

function categoryColor(category) {
  const colors = {
    Router: "var(--green)",
    Switch: "var(--cyan)",
    "Access Point": "var(--amber)",
    Laptop: "var(--violet)",
    HP: "var(--red)",
    Server: "var(--cyan)",
    Manual: "var(--muted)"
  };
  return colors[category] || "var(--muted)";
}

function categoryIcon(category) {
  const icons = {
    Router: `
      <svg viewBox="0 0 24 24" focusable="false">
        <path d="M5 16h14v5H5z" />
        <path d="M8 16v-2a4 4 0 0 1 8 0v2" />
        <path d="M8 10a7 7 0 0 1 8 0" />
        <path d="M6 7a11 11 0 0 1 12 0" />
        <path d="M8 19h.01" />
        <path d="M12 19h.01" />
      </svg>
    `,
    Switch: `
      <svg viewBox="0 0 24 24" focusable="false">
        <path d="M4 8h16v8H4z" />
        <path d="M7 12h2" />
        <path d="M11 12h2" />
        <path d="M15 12h2" />
        <path d="M8 16v3" />
        <path d="M16 16v3" />
      </svg>
    `,
    "Access Point": `
      <svg viewBox="0 0 24 24" focusable="false">
        <path d="M12 18v3" />
        <path d="M8 21h8" />
        <path d="M8 14a6 6 0 0 1 8 0" />
        <path d="M5 11a10 10 0 0 1 14 0" />
        <path d="M11.5 16.5h1" />
      </svg>
    `,
    Laptop: `
      <svg viewBox="0 0 24 24" focusable="false">
        <path d="M5 5h14v11H5z" />
        <path d="M3 19h18" />
        <path d="M8 16h8" />
      </svg>
    `,
    HP: `
      <svg viewBox="0 0 24 24" focusable="false">
        <path d="M8 3h8v18H8z" />
        <path d="M10 6h4" />
        <path d="M11.5 18h1" />
      </svg>
    `,
    Server: `
      <svg viewBox="0 0 24 24" focusable="false">
        <path d="M6 4h12v6H6z" />
        <path d="M6 14h12v6H6z" />
        <path d="M9 7h.01" />
        <path d="M9 17h.01" />
        <path d="M12 10v4" />
      </svg>
    `,
    Manual: `
      <svg viewBox="0 0 24 24" focusable="false">
        <path d="M12 5v14" />
        <path d="M5 12h14" />
        <path d="M7 7h10v10H7z" />
      </svg>
    `
  };
  return icons[category] || icons.Manual;
}

function legendItem(label, count, color) {
  return `
    <div class="legend-item">
      <span class="legend-left"><span class="legend-swatch" style="background:${color}"></span>${label}</span>
      <strong>${count}</strong>
    </div>
  `;
}

function detailItem(label, value) {
  return `<div class="detail-item"><span>${label}</span><strong>${escapeHtml(value || "-")}</strong></div>`;
}

function detailLine(label, value) {
  return `<div class="ping-line"><span>${label}</span><strong>${value}</strong></div>`;
}

function summaryItem(label, value) {
  return `<div class="summary-item"><span>${label}</span><strong>${value}</strong></div>`;
}

function labelStatus(status) {
  return status === "online" ? "Online" : "Offline";
}

function isValidIp(value) {
  const parts = value.split(".");
  return parts.length === 4 && parts.every((part) => /^\d+$/.test(part) && Number(part) >= 0 && Number(part) <= 255);
}

function isValidMac(value) {
  return /^([0-9A-F]{2}:){5}[0-9A-F]{2}$/i.test(value);
}

function formatDateTime(value) {
  if (!value) return "-";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "-";
  return new Intl.DateTimeFormat("id-ID", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit"
  }).format(date);
}

function createId() {
  if (crypto.randomUUID) return crypto.randomUUID();
  return `id-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

init();
