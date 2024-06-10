// Import necessary WordPress modules
const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const { InspectorControls } = wp.blockEditor;
const { PanelBody, RangeControl } = wp.components;

// Register the block
registerBlockType('literati/carousel-block', {
    title: __('Carousel Block'),
    icon: 'slides',
    category: 'common',
    attributes: {
        timer: {
            type: 'number',
            default: 5,
        },
    },
    edit: (props) => {
        const { attributes: { timer }, setAttributes } = props;

        return (
            <div>
                <InspectorControls>
                    <PanelBody title={__('Settings')}>
                        <RangeControl
                            label={__('Transition Timer (seconds)')}
                            value={timer}
                            onChange={(value) => setAttributes({ timer: value })}
                            min={1}
                            max={60}
                        />
                    </PanelBody>
                </InspectorControls>
                <p>{__('Carousel Block')}</p>
            </div>
        );
    },
    save: () => {
        return (
            <div>
                <p>{__('Carousel Block')}</p>
            </div>
        );
    },
});