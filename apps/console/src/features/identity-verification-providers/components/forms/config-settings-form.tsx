/**
 * Copyright (c) 2023, WSO2 LLC. (https://www.wso2.com). All Rights Reserved.
 *
 * WSO2 LLC. licenses this file to you under the Apache License,
 * Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import { IdentifiableComponentInterface } from "@wso2is/core/models";
import { Field, Form } from "@wso2is/form";
import { EmphasizedSegment } from "@wso2is/react-components";
import React, { FunctionComponent, ReactElement } from "react";
import { useTranslation } from "react-i18next";
import { renderFormUIWithMetadata } from "./helpers";
import { IdentityVerificationProviderInterface } from "../../models";
import { InputFieldMetadata } from "../../models/ui-metadata";

/**
 * Proptypes for the identity provider general details form component.
 */
interface ConfigurationSettingsFormProps extends IdentifiableComponentInterface {
    /**
     * Currently editing IDVP.
     */
    identityVerificationProvider: IdentityVerificationProviderInterface;
    /**
     * On submit callback.
     */
    onSubmit: (values: FormData) => void;
    /**
     * Callback to update the idp details.
     */
    onUpdate?: (id: string) => void;
    /**
     * Externally trigger form submission.
     */
    triggerSubmit?: boolean;
    /**
     * Optimize for the creation wizard.
     */
    enableWizardMode?: boolean;
    /**
     * Specifies if the component should only be read-only.
     */
    isReadOnly: boolean;
    /**
     * Specifies if the form is submitting.
     */
    isSubmitting?: boolean;

    /**
     * UI Metadata for the form fields.
     */
    uiMetaData?: InputFieldMetadata[];
}

const FORM_ID: string = "idvp-config-settings-form";

/**
 * Form to edit general details of the identity verification provider.
 *
 * @param props - Props injected to the component.
 * @returns Functional component.
 */
export const ConfigurationSettingsForm: FunctionComponent<ConfigurationSettingsFormProps> = (
    props: ConfigurationSettingsFormProps
): ReactElement => {

    const {
        onSubmit,
        identityVerificationProvider,
        isReadOnly,
        isSubmitting,
        uiMetaData,
        ["data-componentid"]: componentId
    } = props;

    const { t } = useTranslation();

    return (
        <React.Fragment>
            <EmphasizedSegment padded="very">
                <Form
                    id={ FORM_ID }
                    uncontrolledForm={ true }
                    onSubmit={ (values: FormData): void => onSubmit(values) }
                    data-testid={ componentId }
                >
                    { renderFormUIWithMetadata(uiMetaData, identityVerificationProvider, isReadOnly, true) }

                    { !isReadOnly && (
                        <Field.Button
                            form={ FORM_ID }
                            ariaLabel="Update General Details"
                            size="small"
                            buttonType="primary_btn"
                            label={ t("common:update") }
                            name="submit"
                            disabled={ isSubmitting }
                            loading={ isSubmitting }
                        />
                    ) }
                </Form>
            </EmphasizedSegment>
        </React.Fragment>
    );
};

ConfigurationSettingsForm.defaultProps = {
    "data-componentid": "idp-edit-config-settings-form",
    enableWizardMode: false,
    triggerSubmit: false
};
