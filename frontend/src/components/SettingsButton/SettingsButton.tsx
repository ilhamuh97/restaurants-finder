import { useState, type ReactElement, type FormEvent } from "react";
import type {Settings} from "../../types/settings.type.ts"
import gear from "../../assets/gear.png"
import "./SettingsButton.css";

type Props = {
    settings: Settings;
    onSave: (settings: Settings) => void;
};

export default function SettingsButton({ settings, onSave }: Props): ReactElement {
    const [open, setOpen] = useState(false);
    const [radius, setRadius] = useState(settings.radius);
    const [limit, setLimit] = useState(settings.limit);

    function handleOpen() {
        setRadius(settings.radius);
        setLimit(settings.limit);
        setOpen(true);
    }

    function handleSave(e: FormEvent) {
        e.preventDefault();
        onSave({ radius, limit });
        setOpen(false);
    }

    return (
        <>
            <button
                onClick={handleOpen}
                className="map-button"
                aria-label="Settings"
            >
                <img src={gear} alt={"Restaurant Image"} />
            </button>

            {open && (
                <div className="settings-overlay" onClick={() => setOpen(false)}>
                    <div className="settings-popup" onClick={e => e.stopPropagation()}>
                        <h2 className="settings-title">Settings</h2>

                        <form onSubmit={handleSave} className="settings-form">
                            <div className="settings-field">
                                <label htmlFor="radius-input">Radius (meters)</label>
                                <input
                                    id="radius-input"
                                    type="number"
                                    value={radius}
                                    onChange={e => setRadius(e.target.value)}
                                    min="100"
                                    max="50000"
                                    step="100"
                                    required
                                />
                            </div>

                            <div className="settings-field">
                                <label htmlFor="limit-input">Number of results</label>
                                <input
                                    id="limit-input"
                                    type="number"
                                    value={limit}
                                    onChange={e => setLimit(Number(e.target.value))}
                                    min="1"
                                    max="100"
                                    required
                                />
                            </div>

                            <div className="settings-actions">
                                <button type="button" className="settings-btn settings-btn--cancel" onClick={() => setOpen(false)}>
                                    Cancel
                                </button>
                                <button type="submit" className="settings-btn settings-btn--save">
                                    Save
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}
