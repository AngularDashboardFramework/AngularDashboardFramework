/**
 * Created by jayhamilton on 2/25/17.
 */
export interface IWidget {

    run();

    stop();

    toggleConfigMode();

    initializeProperties();

    updateProperties(updatedProperties: any);

    updateData(data: any[]);

    handleError(error: any);

    remove();

    showWidgetControls(enable: boolean);

    configureWidget(instanceId: number, config: any);
}
