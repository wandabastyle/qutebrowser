# --- TokyoNight (Night) for qutebrowser ---
# Put this in ~/.config/qutebrowser/config.py (near the end is fine).
# If you use autoconfig.yml, keep this AFTER config.load_autoconfig().

tn = {
    "bg": "#1a1b26",
    "bg_dark": "#16161e",
    "bg_highlight": "#292e42",
    "fg": "#c0caf5",
    "fg_dark": "#a9b1d6",
    "blue": "#7aa2f7",
    "cyan": "#7dcfff",
    "magenta": "#bb9af7",
    "green": "#9ece6a",
    "yellow": "#e0af68",
    "red": "#f7768e",
    "black": "#15161e",
    "bright_black": "#414868",
}

# Completion (fix: no .bg key — use even/odd)
c.colors.completion.fg = tn["fg"]
c.colors.completion.even.bg = tn["bg_dark"]
c.colors.completion.odd.bg = tn["bg_dark"]  # or tn["bg"] if you want slight contrast

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
c.colors.statusbar.url.success.https.fg = tn["fg"]
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

# Web content (optional)
c.colors.webpage.bg = tn["bg"]
c.colors.webpage.preferred_color_scheme = "dark"
