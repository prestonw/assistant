import React, { memo } from 'react';
import { useHistory, useLocation, Switch, Route } from 'react-router-dom';
import { Button, Icon } from 'ui';
import './style.scss';

const Tabs = ({ tabs = [], ...rest }) => {
	const history = useHistory();
	const location = useLocation();
	return (
		<>
			<Button.Group appearance="tabs" shouldHandleOverflow={true} role="tablist" {...rest}>
				{tabs.map((tab, i) => {
					const { showButton = true, path, label, ...rest } = tab;
					delete rest.component;
					delete rest.exact;
					return (
						showButton && (
							<Button
								key={i}
								isSelected={location.pathname === path}
								onClick={() => history.replace(path, {})}
								{...rest}
							>
								{label}
							</Button>
						)
					);
				})}
			</Button.Group>
		</>
	);
};

const TabsToolbar = ({ tabs }) => {
	const history = useHistory();
	const location = useLocation();

	return (
		<div className="fl-asst-tabs-toolbar">
			<Button.Group appearance="tabs" shouldHandleOverflow={true} role="tablist">
				<Button className="fluid-back-button" appearance="transparent" onClick={history.goBack}>
					<Icon.BackArrow />
				</Button>

				{Object.entries(tabs).map(([, tab], i) => {
					const { isVisible, label, path } = tab;
					if (undefined !== isVisible && !isVisible) {
						return;
					}
					return (
						<Button
							key={i}
							onClick={() => history.replace(path, location.state)}
							isSelected={path === location.pathname}
						>
							{label}
						</Button>
					);
				})}
			</Button.Group>
		</div>
	);
};

const CurrentTab = ({ tabs = [] }) => {
	return (
		<Switch>
			{tabs.map((tab, i) => {
				const { exact = false, path, component, ...rest } = tab;
				const Component = memo(component);
				return <Route key={i} exact={exact} path={path} render={() => <Component {...rest} />} />;
			})}
		</Switch>
	);
};

export { Tabs, TabsToolbar, CurrentTab };
