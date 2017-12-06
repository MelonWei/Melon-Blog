using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.ComponentModel.Composition.Primitives;
using System.ComponentModel.Composition.Hosting;
using System.ComponentModel.Composition;

namespace MelonBlogs
{
    public class MefDependencySolver : IDependencyResolver
    {
        private readonly ComposablePartCatalog _catalog;
        private const string HttpContextKey = "MefContainerKey";

        public MefDependencySolver(ComposablePartCatalog catalog)
        {
            _catalog = catalog;
        }

        public CompositionContainer Container
        {
            get
            {
                if (!HttpContext.Current.Items.Contains(HttpContextKey))
                {
                    HttpContext.Current.Items.Add(HttpContextKey, new CompositionContainer(_catalog));
                    HttpContext.Current.Application["Container"] = new CompositionContainer(_catalog);
                }
                return (CompositionContainer)HttpContext.Current.Items[HttpContextKey];
            }
        }

        #region IDependencyResolver Members

        public object GetService(Type serviceType)
        {
            string contractName = AttributedModelServices.GetContractName(serviceType);
            return Container.GetExportedValueOrDefault<object>(contractName);
        }

        public IEnumerable<object> GetServices(Type serviceType)
        {
            return Container.GetExportedValues<object>(serviceType.FullName);
        }

        #endregion
    }
}