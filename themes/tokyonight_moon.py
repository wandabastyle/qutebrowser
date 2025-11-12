# --- TokyoNight (Moon) for qutebrowser ---
# Keep this after config.load_autoconfig() if you use autoconfig.yml

tn = {
    "bg": "#222436",
    "bg_dark": "#1e2030",
    "bg_highlight": "#2f334d",
    "fg": "#c8d3f5",
    "fg_dark": "#828bb8",
    "blue": "#82aaff",
    "cyan": "#86e1fc",
    "magenta": "#c099ff",
    "green": "#c3e88d",
    "yellow": "#ffc777",
    "red": "#ff757f",
    "black": "#1b1d2b",
    "bright_black": "#444a73",
}

# Completion
c.colors.completion.fg = tn["fg"]
c.colors.completion.even.bg = tn["bg_dark"]
c.colors.completion.odd.bg = tn["bg_dark"]
c.colors.completion.category.fg = tn["fg"]
c.colors.completion.category.bg = tn["bg_highlight"]
c.colors.completion.category.border.top = tn["bg_highlight"]
c.colors.completion.category.border.bottom = tn["bg_highlight"]
c.colors.completion.item.selected.fg = tn["bg"]
c.colors.completion.item.selected.bg = tn["blue"]
c.colors.completion.item.selected.border.top = tn["blue"]
c.colors.completion.item.selected.border.bottom = tn["blue"]
c.colors.completion.match.fg = tn["yellow"]
c.colors.completion.scrollbar.fg = tn["fg"]
c.colors.completion.scrollbar.bg = tn["bg_dark"]

# Statusbar
c.colors.statusbar.normal.bg = tn["bg"]
c.colors.statusbar.normal.fg = tn["fg"]
c.colors.statusbar.insert.bg = tn["green"]
c.colors.statusbar.insert.fg = tn["bg"]
c.colors.statusbar.command.bg = tn["bg_dark"]
c.colors.statusbar.command.fg = tn["fg"]
c.colors.statusbar.url.success.https.fg = tn["blue"]
c.colors.statusbar.url.error.fg = tn["red"]
c.colors.statusbar.progress.bg = tn["blue"]

# Tabs
c.colors.tabs.bar.bg = tn["bg_dark"]
c.colors.tabs.even.bg = tn["bg_dark"]
c.colors.tabs.odd.bg = tn["bg_dark"]
c.colors.tabs.even.fg = tn["fg_dark"]
c.colors.tabs.odd.fg = tn["fg_dark"]
c.colors.tabs.selected.even.bg = tn["bg"]
c.colors.tabs.selected.odd.bg = tn["bg"]
c.colors.tabs.selected.even.fg = tn["fg"]
c.colors.tabs.selected.odd.fg = tn["fg"]
c.colors.tabs.indicator.system = "none"
c.colors.tabs.indicator.start = tn["cyan"]
c.colors.tabs.indicator.stop = tn["green"]
c.colors.tabs.indicator.error = tn["red"]

# Hints
c.colors.hints.bg = tn["yellow"]
c.colors.hints.fg = tn["bg"]
c.colors.hints.match.fg = tn["red"]

# Downloads / messages
c.colors.downloads.bar.bg = tn["bg"]
c.colors.downloads.start.bg = tn["blue"]
c.colors.downloads.stop.bg = tn["green"]
c.colors.downloads.error.bg = tn["red"]
c.colors.messages.info.bg = tn["blue"]
c.colors.messages.info.fg = tn["bg"]
c.colors.messages.warning.bg = tn["yellow"]
c.colors.messages.warning.fg = tn["bg"]
c.colors.messages.error.bg = tn["red"]
c.colors.messages.error.fg = tn["bg"]

# Web content
c.colors.webpage.bg = tn["bg"]
c.colors.webpage.preferred_color_scheme = "dark"
