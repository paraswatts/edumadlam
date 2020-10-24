import { _scaleText } from "../services";

export const TEXT_STYLES = {
    H1: {
        ..._scaleText(24),
        lineHeight: _scaleText(36).fontSize,

    },
    H2: {
        ..._scaleText(20),
        lineHeight: _scaleText(30).fontSize,

    },
    H3: {
        ..._scaleText(18),
        lineHeight: _scaleText(27).fontSize,

    },
    H4: {
        ..._scaleText(16),
        lineHeight: _scaleText(24).fontSize,

    },
    H5: {
        ..._scaleText(14),
        lineHeight: _scaleText(21).fontSize,

    },
    SB1: {
        ..._scaleText(16),
        lineHeight: _scaleText(24).fontSize,

    },
    SB2: {
        ..._scaleText(14),
        lineHeight: _scaleText(21).fontSize,

    },
    BODY1: {
        ..._scaleText(18),
        lineHeight: _scaleText(27).fontSize,

    },
    BODY2: {
        ..._scaleText(16),
        lineHeight: _scaleText(24).fontSize,

    },
    BODY3: {
        ..._scaleText(14),
        lineHeight: _scaleText(21).fontSize,

    },
    BODY4: {
        ..._scaleText(12),
        lineHeight: _scaleText(18).fontSize,

    }
}